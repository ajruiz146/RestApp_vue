export default {
    
    methods: {
        pageUp() {
            if(this.page < this.totalPages) {
                this.page ++  
                this.getProducts()
            }
        },
        pageDown() {
            if(this.page > 1) {
                this.page --
                this.getProducts()
            }
        },
        searchPage(page) {
            this.page = page
            this.getProducts()
        }
    }
}
