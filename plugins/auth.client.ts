export default defineNuxtPlugin(() => {
    const { $router } = useNuxtApp()

    // Add global navigation guard
    $router.beforeEach(async (to, from) => {
        // Skip auth check for login and API routes
        if (to.path === '/login' || to.path === '/debug' || to.path.startsWith('/api/')) {
            return true
        }

        // Check authentication
        const hasValidToken = await checkAuthToken()

        if (!hasValidToken) {
            return '/login'
        }

        return true
    })
})

async function checkAuthToken(): Promise<boolean> {
    try {
        // Method 1: Check browser cookies directly
        if (process.client) {
            const cookieValue = document.cookie
                .split(';')
                .find(row => row.trim().startsWith('sporky_access_token='));

            if (cookieValue) {
                const token = cookieValue.split('=')[1];
                if (token && token !== '') {
                    return true
                }
            }
        }

        // Method 2: Check server-side
        const response = await $fetch('/api/cookie-test') as any
        if (response?.cookies?.sporky_access_token && response.cookies.sporky_access_token !== 'not found') {
            return true
        }

        return false
    } catch (error) {
        console.error('Error checking auth token:', error)
        return false
    }
}
