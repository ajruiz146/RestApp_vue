export default {
    methods: {
        onChangeOrder(event) {
            if(event.target.value == "ea") {
                this.emailAsc();
            } else if(event.target.value == "ed"){
                this.emailDesc();
            } else if(event.target.value == "da") {
                this.dateAsc();
            } else if(event.target.value == "dd") {
                this.dateDesc();
            } else if(event.target.value == "pa") {
                this.priceAsc();
            } else if(event.target.value == "pd") {
                this.priceDesc();
            }
        },
        emailAsc() {
            this.field = 'email';
            this.order = 'asc';
            this.getOrders();
        },
        emailDesc() {
            this.field = 'email';
            this.order = 'desc';
            this.getOrders();
        },
        dateAsc() {
            this.field = 'date';
            this.order = 'asc';
            this.getOrders();
        },
        dateDesc() {
            this.field = 'date';
            this.order = 'desc';
            this.getOrders();
        },
        priceAsc() {
            this.field = 'total';
            this.order = 'asc';
            this.getOrders();
        },
        priceDesc() {
            this.field = 'total';
            this.order = 'desc';
            this.getOrders();
        },
        
    }
}