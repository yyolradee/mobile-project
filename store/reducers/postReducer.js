import CATEGORIES from "../../data/categories.json"
import FACULTIES from "../../data/faculties.json"
import LOCATION from "../../data/location.json"
import POSTDETAIL from "../../data/postDetail.json"

const initialState = {
    categoriesData: CATEGORIES,
    facultiesData: FACULTIES,
    locationData: LOCATION,
    postDetailData: POSTDETAIL,
    statusData: ["รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น"],
    filterData: []
}

const drawerReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default drawerReducer