import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'b2d3eb0f34mshf59f64a6a6bb3fdp1db515jsnbae95cb2eb15',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
  

}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
reducerPath: 'cryptoNewsApi',
baseQuery: fetchBaseQuery({ baseUrl }),
endpoints: (builder) => ({
    getCryptoNews: builder.query({
        query: () => createRequest(`/v1/coindesk`),
    })
})
});

export const {
useGetCryptoNewsQuery,
} = cryptoNewsApi;


// const cryptoNewsHeaders = {
    
//         'X-BingApis-SDK': 'true',
//         'X-RapidAPI-Key': 'b2d3eb0f34mshf59f64a6a6bb3fdp1db515jsnbae95cb2eb15',
//         'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      

// }

// const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

// const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

// export const cryptoNewsApi = createApi({
//     reducerPath: 'cryptoNewsApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         getCryptoNews: builder.query({
//             query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
//         })
//     })
// });

// export const {
//     useGetCryptoNewsQuery,
// } = cryptoNewsApi;


