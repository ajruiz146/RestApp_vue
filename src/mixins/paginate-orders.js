export default {
    
    methods: {
        pageUp() {
            if(this.page < this.totalPages) {
                this.page ++  
                this.getOrders()
            }
        },
        pageDown() {
            if(this.page > 1) {
                this.page --
                this.getOrders()
            }
        },
        searchPage(page) {
            this.page = page
            this.getOrders()
        }
    }
}
