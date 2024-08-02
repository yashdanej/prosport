import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import TwoFactorSlice from "./Reducers/TwoFactorSlice";
import FormWizardTwoSlice from "./Reducers/FormWizardTwoSlice";
import NumberingWizardSlice from "./Reducers/NumberingWizardSlice";
import StudentWizardSlice from "./Reducers/StudentWizardSlice";
import VerticalWizardSlice from "./Reducers/VerticalWizardSlice";
import ChatSlice from "./Reducers/ChatSlice";
import ContactSlice from "./Reducers/ContactSlice";
import TasksSlice from "./Reducers/TasksSlice";
import ProductSlice from "./Reducers/ProductSlice";
import BookmarkTabSlice from "./Reducers/BookmarkTabSlice";
import FilterSlice from "./Reducers/FilterSlice";
import CartSlice from "./Reducers/CartSlice";
import ToDoSlice from "./Reducers/ToDoSlice";
import ProjectSlice from "./Reducers/ProjectSlice";
import AddProductSlice from "./Reducers/AddProductSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import BookmarkHeaderSlice from "./Reducers/BookmarkHeaderSlice";
import { authReducer } from "./Reducers/Change/AuthSlice";
import { subscribeReducer } from "./Reducers/Change/Subscribe";
import { dashboardReducer } from "./Reducers/Change/Dashboard";
import { profileReducer } from "./Reducers/Change/ProfileSlice";
import { analyticsReducer } from "./Reducers/Change/AnalyticsSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    twoFactor: TwoFactorSlice,
    formWizardTwo:FormWizardTwoSlice,
    numberingWizard: NumberingWizardSlice,
    studentWizard: StudentWizardSlice,
    verticalWizard: VerticalWizardSlice,
    product:ProductSlice,
    chat:ChatSlice,
    contact:ContactSlice,
    tasks:TasksSlice,
    bookmarkTab:BookmarkTabSlice,
    filterData: FilterSlice,
    cartData: CartSlice,
    todo:ToDoSlice,
    project:ProjectSlice,
    addProduct:AddProductSlice,
    themeCustomizer: ThemeCustomizerSlice,
    letterBox:LetterBoxSlice,
    bookmarkHeader:BookmarkHeaderSlice,

    // Change
    analytics:analyticsReducer,
    auth:authReducer,
    subscribe:subscribeReducer,
    dashboard: dashboardReducer,
    profile: profileReducer
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
