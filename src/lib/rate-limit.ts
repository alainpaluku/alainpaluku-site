/**
 * Rate limiting pour les API routes sur Cloudflare
 * Utilise l'IP du client pour limiter les requêtes
 */

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
    maxRequests: 5, // 5 requêtes
    windowMs: 60000, // par minute
};

// Cache en mémoire simple (réinitialisé à chaque déploiement)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Vérifie si une IP a dépassé la limite de requêtes
 */
export function checkRateLimit(
    clientIP: string,
    config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = requestCounts.get(clientIP);

    // Première requête ou fenêtre expirée
    if (!record || now > record.resetTime) {
        const resetTime = now + config.windowMs;
        requestCounts.set(clientIP, { count: 1, resetTime });
        return { allowed: true, remaining: config.maxRequests - 1, resetTime };
    }

    // Incrémenter le compteur
    record.count++;
    requestCounts.set(clientIP, record);

    // Vérifier la limite
    const allowed = record.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - record.count);

    return { allowed, remaining, resetTime: record.resetTime };
}

/**
 * Obtient l'IP du client depuis les headers Cloudflare
 */
export function getClientIP(request: Request): string {
    // Cloudflare ajoute l'IP réelle dans CF-Connecting-IP
    return (
        request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0] ||
        'unknown'
    );
}

/**
 * Nettoie les anciennes entrées du cache (à appeler périodiquement)
 */
export function cleanupRateLimitCache(): void {
    const now = Date.now();
    for (const [ip, record] of requestCounts.entries()) {
        if (now > record.resetTime) {
            requestCounts.delete(ip);
        }
    }
}
