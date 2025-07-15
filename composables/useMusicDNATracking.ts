import type { MusicDNASnapshot, GetMusicDNAResponse, CreateMusicDNARequest } from '~/types/musicDNA'

export const useMusicDNATracking = () => {
    // const supabase = useSupabaseClient()
    // const user = useSupabaseUser()

    // // State
    // const isLoading = ref(false)
    // const error = ref<string | null>(null)
    // const snapshots = ref<MusicDNASnapshot[]>([])
    // const trends = ref<any[]>([])

    // // Get current user ID
    // const getUserId = () => {
    //     if (!user.value?.id) {
    //         throw new Error('User must be authenticated')
    //     }
    //     return user.value.id
    // }

    // // Save current music DNA snapshot
    // const saveMusicDNA = async (tracks: any[], timeRange: string) => {
    //     try {
    //         isLoading.value = true
    //         error.value = null

    //         const userId = getUserId()

    //         const requestBody: CreateMusicDNARequest = {
    //             time_range: timeRange,
    //             tracks
    //         }

    //         const response = await $fetch('/api/track', {
    //             method: 'POST',
    //             body: requestBody,
    //             query: { user_id: userId }
    //         })

    //         return response
    //     } catch (err: any) {
    //         error.value = err.message || 'Failed to save music DNA'
    //         console.error('Error saving music DNA:', err)
    //         throw err
    //     } finally {
    //         isLoading.value = false
    //     }
    // }

    // // Get music DNA history
    // const getMusicDNAHistory = async (timeRange?: string, limit = 10) => {
    //     try {
    //         isLoading.value = true
    //         error.value = null

    //         const userId = getUserId()

    //         const query: any = { user_id: userId, limit }
    //         if (timeRange) query.time_range = timeRange

    //         const response = await $fetch<GetMusicDNAResponse>('/api/track', {
    //             method: 'GET',
    //             query
    //         })

    //         snapshots.value = response.snapshots
    //         trends.value = response.trends

    //         return response
    //     } catch (err: any) {
    //         error.value = err.message || 'Failed to fetch music DNA history'
    //         console.error('Error fetching music DNA history:', err)
    //         throw err
    //     } finally {
    //         isLoading.value = false
    //     }
    // }

    // // Get latest snapshot for comparison
    // const getLatestSnapshot = async (timeRange: string) => {
    //     try {
    //         const response = await getMusicDNAHistory(timeRange, 1)
    //         return response.snapshots[0] || null
    //     } catch (err) {
    //         console.error('Error fetching latest snapshot:', err)
    //         return null
    //     }
    // }

    // // Compare current data with previous snapshot
    // const compareWithPrevious = (currentTracks: any[], previousSnapshot: MusicDNASnapshot) => {
    //     if (!previousSnapshot) return null

    //     // Calculate current metrics
    //     const currentArtists = new Set()
    //     currentTracks.forEach(track => {
    //         track.artists.forEach((artist: any) => {
    //             currentArtists.add(artist.name)
    //         })
    //     })

    //     const currentDiversity = Math.min(Math.round((currentArtists.size / currentTracks.length) * 100), 100)

    //     return {
    //         diversityChange: currentDiversity - previousSnapshot.artist_diversity_score,
    //         tracksChange: currentTracks.length - previousSnapshot.total_tracks,
    //         artistsChange: currentArtists.size - previousSnapshot.unique_artists,
    //         daysSinceLastSnapshot: Math.floor(
    //             (new Date().getTime() - new Date(previousSnapshot.snapshot_date).getTime()) / (1000 * 60 * 60 * 24)
    //         )
    //     }
    // }

    // // Auto-save functionality (can be called when tracks are loaded)
    // const autoSaveMusicDNA = async (tracks: any[], timeRange: string, options = { skipIfRecent: true }) => {
    //     try {
    //         if (options.skipIfRecent) {
    //             const latest = await getLatestSnapshot(timeRange)
    //             if (latest) {
    //                 const daysSince = Math.floor(
    //                     (new Date().getTime() - new Date(latest.snapshot_date).getTime()) / (1000 * 60 * 60 * 24)
    //                 )
    //                 // Skip if snapshot was taken in the last 7 days
    //                 if (daysSince < 7) {
    //                     console.log('Skipping auto-save: recent snapshot exists')
    //                     return latest
    //                 }
    //             }
    //         }

    //         return await saveMusicDNA(tracks, timeRange)
    //     } catch (err) {
    //         console.error('Auto-save failed:', err)
    //         // Don't throw error for auto-save failures
    //         return null
    //     }
    // }

    // // Clear error
    // const clearError = () => {
    //     error.value = null
    // }

    // return {
    //     // State
    //     isLoading: readonly(isLoading),
    //     error: readonly(error),
    //     snapshots: readonly(snapshots),
    //     trends: readonly(trends),

    //     // Methods
    //     saveMusicDNA,
    //     getMusicDNAHistory,
    //     getLatestSnapshot,
    //     compareWithPrevious,
    //     autoSaveMusicDNA,
    //     clearError
    // }
}
