<template>
    <div class="gid-stat-container" id="gid-stat">
        <div
            class="gid-stat-item-container"
            :class="column.class"
            v-for="column in columns"
            :key="column.id"
            @click="onColumnClick(column)"
        >
            <div class="gid-stat-item-data">
                <slot :name="column.slotName" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: []
        };
    },
    props: {
        items: {
            type: Array,
            default: []
        },
        selectable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onColumnClick(column) {
            if (this.selectable) this.selectColumn(column);
        },
        selectColumn(column) {
            console.log(column);
            this.columns = [
                ...this.columns.map(e => {
                    if (e.cID === column.cID)
                        return { ...e, class: "selected" };
                    else return { ...e, class: "" };
                })
            ];
            this.$emit("selected", column.slotName);
        },
        parseColumns() {
            this.columns = this.items.map((e, index) => {
                if (this.selectable) return { ...e, cID: index };
                else return { ...e, cID: index, class: "" };
            });
        },
        divideGrid() {
            let n = this.columns.length;
            let columnsSize = (100 / n).toString() + "% ";
            let gridTemplateColumns = "";
            for (let i = 0; i < n; i++) {
                gridTemplateColumns += columnsSize;
            }
            let stat = document.getElementById("gid-stat");
            stat.style.gridTemplateColumns = gridTemplateColumns;
        }
    },
    mounted() {
        this.divideGrid();
    },
    beforeMount() {
        this.parseColumns();
    }
};
</script>

<style scoped>
.gid-stat-container {
    display: grid;
    width: 100%;
    height: 96px;
    text-align: center;
    justify-content: center;
    align-content: center;
    background: #24324f;
}
.gid-stat-item-container {
    color: white;
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.selected {
    background: #414d67;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.selected:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 84px;
    border-bottom: solid 12px #fff;
    border-left: solid 7px transparent;
    border-right: solid 7px transparent;
}
</style>
