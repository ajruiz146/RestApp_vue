export default {
    
    methods: {
        pageUp() {
            if(this.page < this.totalPages) {
                this.page ++  
                this.getUsers()
            }
        },
        pageDown() {
            if(this.page > 1) {
                this.page --
                this.getUsers()
            }
        },
        searchPage(page) {
            this.page = page
            this.getUsers()
        }
    }
}
