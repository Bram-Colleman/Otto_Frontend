import { onUnmounted, onMounted, ref } from 'vue'

export function useGeolocation() {
    const coords = ref({ latitude: 0, longitude: 0 });
    const isSupported = 'navigator' in window && 'geolocation' in navigator;

    let watcher = null;
    onMounted(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                coords.value = pos;

                },
                () => {
                handleLocationError(true);
                }
            );
            } else {
            // Browser doesn't support Geolocation
            handleLocationError(false);
            }
    })
    onUnmounted(() => {
        if (watcher) {
            navigator.geolocation.clearWatch(watcher);
        }
    })

    return {coords}

}
