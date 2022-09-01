import ImageData from '../@types/ImageData';
import DateRange from '../@types/DateRange';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Config from '../Config';
import {BaseQueryApi} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = fetchBaseQuery({baseUrl: Config.API_URL});

type ImageResponse = ImageData[];
const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
    console.log(result.error);
  }
  console.log('fetchBaseQuery');
  console.log(result);
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    getImagesWithinRange: builder.query<ImageResponse, DateRange>({
      query: (date: DateRange) =>
        `?api_key=${Config.API_KEY_PROD}&start_date=${date.startDate}&end_date=${date.endDate}`,
    }),
  }),
});

export default api;
