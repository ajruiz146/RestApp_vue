<template>
    <div class="filters">
        <select class="form-select form-select-sm" name="" id="">
            <option value="">Select type</option>
            <option value="">Kitchen</option>
            <option value="">Bar</option>
        </select>

        <select class="form-select form-select-sm" name="" id="">
            <option value="">Per Page</option>
            <option value="">12</option>
            <option value="">20</option>
            <option value="">50</option>

        </select>

        <select class="form-select form-select-sm" name="" id="">
            <option value="">Order by</option>
            <option value="na">Name Asc</option>
            <option value="nd">Name Desc</option>
        </select>
    </div>
    
</template>

<style scoped>
    select {
        margin: 0 3px;
    }
    .filters {
        display: flex;
    }
</style>