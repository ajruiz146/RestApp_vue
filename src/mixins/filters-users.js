export default {
    methods: {
        onChangeOrder(event) {
            if(event.target.value == "na") {
                this.nameAsc();
            } else if(event.target.value == "nd"){
                this.nameDesc();
            } else if(event.target.value == "ea") {
                this.emailAsc();
            } else if(event.target.value == "ed") {
                this.emailDesc();
            }
        },
        nameAsc() {
            this.field = 'name';
            this.order = 'asc';
            this.getUsers();
        },
        nameDesc() {
            this.field = 'name';
            this.order = 'desc';
            this.getUsers();
        },
        emailAsc() {
            this.field = 'email';
            this.order = 'asc';
            this.getUsers();
        },
        emailDesc() {
            this.field = 'email';
            this.order = 'desc';
            this.getUsers();
        },
    }
}