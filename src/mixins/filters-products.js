export default {
    methods: {
        onChangeOrder(event) {
            if(event.target.value == "na") {
                this.nameAsc();
            } else if(event.target.value == "nd"){
                this.nameDesc();
            } else if(event.target.value == "pa") {
                this.priceAsc();
            } else if(event.target.value == "pd") {
                this.priceDesc();
            }
        },
        onChangeFilter(event) {
            if(event.target.value == "s") {
                this.starters();
            } else if(event.target.value == "p"){
                this.principals();
            } else if(event.target.value == "d"){
                this.drinks();
            } else if(event.target.value == "de"){
                this.dessert();
            }
        },
        nameAsc() {
            this.field = 'name';
            this.order = 'asc';
            this.page = 1;
            this.getProducts();
        },
        nameDesc() {
            this.field = 'name';
            this.order = 'desc';
            this.page = 1;
            this.getProducts();
        },
        priceAsc() {
            this.field = 'price';
            this.order = 'asc';
            this.page = 1;
            this.getProducts();
        },
        priceDesc() {
            this.field = 'price';
            this.order = 'desc';
            this.page = 1;
            this.getProducts();
        },
        starters() {
            this.fieldWhere = 'category'
            this.value = 'Starters'
            this.page = 1;
            this.getProducts();
        },
        principals() {
            this.fieldWhere = 'category'
            this.value = 'Main course'
            this.page = 1;
            this.getProducts();
        },
        drinks() {
            this.fieldWhere = 'category'
            this.value = 'Drinks'
            this.page = 1;
            this.getProducts();
        },
        dessert() {
            this.fieldWhere = 'category'
            this.value = 'Desserts'
            this.page = 1;
            this.getProducts();
        }
    }
}