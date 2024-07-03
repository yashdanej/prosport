import * as Yup from "yup";
import { ProjectInitialValue, ProjectListData } from "../../../Types/Application/ProjectList/ProjectList";

export const projectData:ProjectListData[] =  [
    {
        id: 1,
        title: "Endless admin Design",
        badge: "Doing",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Endless Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "12",
        resolved: "5",
        comment: "7",
        like: "10",
        progress: 70,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"primary"
    },
    {
        id: 2,
        title: "Universal admin Design",
        badge: "Done",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "24",
        resolved: "24",
        comment: "40",
        like: "3",
        progress: 100,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"secondary"
    },
    {
        id: 3,
        title: "Poco admin Design",
        badge: "Done",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "40",
        resolved: "40",
        comment: "20",
        like: "2",
        progress: 100,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"success"
    },
    {
        id: 4,
        title: "Universal admin Design",
        badge: "Done",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "24",
        resolved: "24",
        comment: "40",
        like: "3",
        progress: 100,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"primary"
    },
    {
        id: 5,
        title: "Endless admin Design",
        badge: "Doing",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Endless Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "12",
        resolved: "5",
        comment: "7",
        like: "10",
        progress: 70,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"secondary"
    },
    {
        id: 6,
        title: "Poco admin Design",
        badge: "Done",
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
        issue: "40",
        resolved: "40",
        comment: "20",
        like: "2",
        progress: 100,
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        color:"success"
    }
]

export const projectInitialValue: ProjectInitialValue = {
    title: "",
    client: "",
    progress: 0,
    type: "",
    priority: "",
    size: "",
    description: "",
  };
  
  export const projectValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    client: Yup.string().required("Client Name is required"),
    description: Yup.string().required("Some Details is required"),
    progress: Yup.number().required("Between 0 to 100").max(100),
  });