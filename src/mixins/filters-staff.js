export default {
    methods: {
        onChangeOrder(event) {
            if(event.target.value == "na") {
                this.nameAsc();
            } else if(event.target.value == "nd"){
                this.nameDesc();
            } else if(event.target.value == "ra") {
                this.roleAsc();
            } else if(event.target.value == "rd") {
                this.roleDesc();
            }
        },
        onChangeFilter(event) {
            if(event.target.value == "kitchen") {
                this.kitchen();
            } else if(event.target.value == "waiter"){
                this.waiter();
            } else if(event.target.value == "bar"){
                this.bar();
            } else if(event.target.value == "admin"){
                this.admin();
            }
        },
        nameAsc() {
            this.field = 'name';
            this.order = 'asc';
            this.page = 1;
            this.getStaff();
        },
        nameDesc() {
            this.field = 'name';
            this.order = 'desc';
            this.page = 1;
            this.getStaff();
        },
        roleAsc() {
            this.field = 'role';
            this.order = 'asc';
            this.page = 1;
            this.getStaff();
        },
        roleDesc() {
            this.field = 'role';
            this.order = 'desc';
            this.page = 1;
            this.getStaff();
        },
        kitchen() {
            this.fieldWhere = 'role'
            this.value = 'kitchen'
            this.page = 1;
            this.getStaff();
        },
        waiter() {
            this.fieldWhere = 'role'
            this.value = 'waiter'
            this.page = 1;
            this.getStaff();
        },
        bar() {
            this.fieldWhere = 'role'
            this.value = 'bar'
            this.page = 1;
            this.getStaff();
        },
        admin() {
            this.fieldWhere = 'role'
            this.value = 'admin'
            this.page = 1;
            this.getStaff();
        }
    }
}