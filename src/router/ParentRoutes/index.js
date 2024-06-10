import { loadView } from '@/router/loadview';
export default [

    {
        path: "/parent",
        name: "ParentView",
        component: loadView("Parent/ParentView"),
        redirect: {
            name: "Children1"
        },
        children: [
            {
                path: "children-1",
                name: "Children1",
                component: loadView("Parent/Children/Children1"),
            },
            {
                path: "children-2",
                name: "Children2",
                component: loadView("Parent/Children/Children2"),
            },
            {
                path: "children-3",
                name: "Children3",
                component: loadView("Parent/Children/Children3"),
            },
        ]
    }
    
    
]