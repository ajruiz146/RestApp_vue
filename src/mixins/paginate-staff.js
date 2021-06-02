export default {
    
    methods: {
        pageUp() {
            if(this.page < this.totalPages) {
                this.page ++  
                this.getStaff()
            }
        },
        pageDown() {
            if(this.page > 1) {
                this.page --
                this.getStaff()
            }
        },
        searchPage(page) {
            this.page = page
            this.getStaff()
        }
    }
}
