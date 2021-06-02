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
            }
        },
        nameAsc() {
            this.field = 'name';
            this.order = 'asc';
            this.getStaff();
        },
        nameDesc() {
            this.field = 'name';
            this.order = 'desc';
            this.getStaff();
        },
        roleAsc() {
            this.field = 'role';
            this.order = 'asc';
            this.getStaff();
        },
        roleDesc() {
            this.field = 'role';
            this.order = 'desc';
            this.getStaff();
        },
        kitchen() {
            this.fieldWhere = 'role'
            this.value = 'kitchen'
            this.getStaff();
        },
        waiter() {
            this.fieldWhere = 'role'
            this.value = 'waiter'
            this.getStaff();
        },
        bar() {
            this.fieldWhere = 'role'
            this.value = 'bar'
            this.getStaff();
        }
    }
}