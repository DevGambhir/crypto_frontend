import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '28cdb23c62msh794ccc1138347e5p1d004ajsn55e97d7b548c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc`),
        }),
        
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`),
        })

    })
});

export const {
    useGetCryptosQuery, useGetCryptoHistoryQuery, useGetExchangesQuery
} = cryptoApi;
