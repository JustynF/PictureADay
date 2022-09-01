import api from './api';

export function useGetImagesWithinFrame(startDate: Date, endDate: Date) {
  let formattedStart =
    startDate.getFullYear() +
    '-' +
    startDate.getMonth() +
    '-' +
    startDate.getDate();
  let formattedEnd =
    endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate();
  console.log('Api Provider');
  console.log(formattedStart);
  console.log(formattedEnd);
  const {data, error, isLoading, isSuccess, isFetching} =
    api.useGetImagesWithinRangeQuery({
      startDate: formattedStart,
      endDate: formattedEnd,
    });
  return {data, error, isLoading, isSuccess, isFetching};
}
