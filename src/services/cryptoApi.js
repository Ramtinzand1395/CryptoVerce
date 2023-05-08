import {fetchBaseQuery , createApi} from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '598aeef703mshb6b2dda01fcc11fp14dd1ejsnbc7a4971acff',
};

const baseUrl ='https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({url , headers:cryptoHeaders})

export const ApiSlice = createApi({
    reducerPath:"cryptoApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) =>({
        getCryptos : builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
          getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`),
          }),
          getExchanges: builder.query({
            query: () => createRequest('/coin/Qwsogvtv82FCd/exchanges'),
          }),
    })
});
export const {  useGetCryptosQuery , useGetCryptoDetailsQuery , useGetCryptoHistoryQuery , useGetExchangesQuery } = ApiSlice;