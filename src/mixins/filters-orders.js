export default {
    methods: {
        onChangeOrder(event) {
            if(event.target.value == "da") {
                this.dateAsc();
            } else if(event.target.value == "dd") {
                this.dateDesc();
            } else if(event.target.value == "pa") {
                this.priceAsc();
            } else if(event.target.value == "pd") {
                this.priceDesc();
            }
        },
        dateAsc() {
            this.field = 'date';
            this.order = 'asc';
            this.page = 1;
            this.getOrders();
        },
        dateDesc() {
            this.field = 'date';
            this.order = 'desc';
            this.page = 1;
            this.getOrders();
        },
        priceAsc() {
            this.field = 'total';
            this.order = 'asc';
            this.page = 1;
            this.getOrders();
        },
        priceDesc() {
            this.field = 'total';
            this.order = 'desc';
            this.page = 1;
            this.getOrders();
        },
        
    }
}