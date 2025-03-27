import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { BlogState } from "@/types";
import { getRequest } from "@/service/requestService";

const initialState: BlogState = {
    blog: null,
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        getBlog: (state, action) => {
            state.blog = action.payload;
        }
    },
});

export const getBlogsDispatch = (page: number, size: number) => async (dispatch: Dispatch) => {
    getRequest({
            controller: "Blogs",
            params: { PageIndex: page, PageSize: size },
        })
        .then(res=>{
            if (res?.items) {
                dispatch(getBlogs(res.items));
            } else {
                console.error("❌ Hata: Redux'a gönderilecek blog verisi bulunamadı!");
            }
        }).catch(error => console.error("❌ API Error:", error));
};

export const getBlogDispatch = (blogSlug: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    setLoading(true);

    try {
        const res = await getRequest({
            controller: "Blogs",
            action: `by-slug/${blogSlug}`,
            params: {},
        });

        console.log("✅ API Yanıtı Alındı:", res);

        if (res) {
            dispatch(getBlog(res));
            console.log("✅ Redux'a Gönderilen Blog:", res);
        } else {
            console.error("❌ Hata: Redux'a gönderilecek blog verisi bulunamadı!");
        }
    } catch (error) {
        console.error("❌ API Hatası:", error);
    } finally {
        setLoading(false);
    }
};

export const { getBlogs, getBlog } = blogSlice.actions;
export default blogSlice.reducer;
