import { defineStore } from 'pinia'

export const usePacketStore = defineStore('packet', {
    state: () => ({
        packets: [] as Array<{ id: string; Price: string; Description: string; Color: string }>
    }),
    actions: {
        async fetchPackets(currentLang: string) {
            const { data, error } = await useFetch('/api/homePage/packets', {
                query: { lang: currentLang }
            })

            if (error.value) {
                console.error('Errore caricamento pacchetti:', error.value)
                this.packets = []
                return
            }

            this.packets = data.value?.packets ?? []
        }
    }
})
