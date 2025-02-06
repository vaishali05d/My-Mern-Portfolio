import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk
export const fetchPortfolioData = createAsyncThunk(
    'root/fetchPortfolioData',
    async () => {
        const response = await fetch('/api/portfolio/get.portfolio.data'); // replace with your actual API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
);

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        loading: false,
        portfolioData: null,
        reloadData: false,
    },
    reducers: {
        ShowLoading: (state) => {
            state.loading = true;
        },
        HideLoading: (state) => {
            state.loading = false;
        },
        SetPortfolioData: (state, action) => {
            state.portfolioData = action.payload;
        },
        ReloadData: (state, action) => {
            state.reloadData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolioData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPortfolioData.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolioData = action.payload;
            })
            .addCase(fetchPortfolioData.rejected, (state) => {
                state.loading = false;
                // Optionally handle error state here
            });
    },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortfolioData, ReloadData } = rootSlice.actions;