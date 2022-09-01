/**
 * The ViewModel is a producer who doesn’t care who consumes data;
 * it can be React component, Vue component, aeroplane or even a cow,
 * it simply doesn’t care. Because the ViewModel is just a regular
 * JavaScript class it can be easily reused anywhere with UI
 * tailored differently. Every dependency needed by the ViewModel
 * will be injected through the constructor, thus making it easy to test.
 * The ViewModel is interacting directly with the Model and whenever the
 * ViewModel updates it, all changes will be automatically reflected back
 * to the View.
 */
import {useState} from 'react';
import {useGetImagesWithinFrame} from '../Services/ApiProvider';

export default function useGalaxyHomeViewModel() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate());
    return date;
  });
  const [showCal, setShowCal] = useState<boolean>(false);
  const [images, setImages] = useState<any | []>([]);

  const {data, error, isLoading, isSuccess, isFetching} =
    useGetImagesWithinFrame(startDate, endDate);

  function getImages(payload: any) {
    setImages(payload);
  }

  return {
    isLoading,
    isSuccess,
    isFetching,
    setImages,
    data,
    error,
    getImages,
    images,
    showCal,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setShowCal,
  };
}
