import { defineStore } from 'pinia'

export const usePacketStore = defineStore('packet', {
    state: () => ({
        packets: [] as Array<{ id: string; price: string; duration: string; color: string }>
    }),
    actions: {
        async fetchPackets(currentLang: string, supabase: any) {
            const { data, error } = await supabase
                .from('Packets')
                .select('Id, Price, Duration, Duration_it, Color')

            if (!error && data) {
                this.packets = data.map(p => ({
                    id: String(p.Id),
                    price: p.Price,
                    duration: currentLang === 'it' ? p.Duration_it : p.Duration,
                    color: p.Color
                }))
            } else {
                console.error('⚠️ Supabase error:', error)
            }
        }
    }
})