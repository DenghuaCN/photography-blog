import { cc } from '@/utility/css';
import { Photo, PhotoDateRange, dateRangeForPhotos } from '.';
import ShareButton from '@/components/ShareButton';

export default function PhotoHeader({
  entity,
  entityVerb,
  entityDescription,
  photos,
  selectedPhoto,
  sharePath,
  count,
  dateRange,
}: {
  entity: JSX.Element
  entityVerb: string
  entityDescription: string
  photos: Photo[]
  selectedPhoto?: Photo
  sharePath: string
  count?: number
  dateRange?: PhotoDateRange
}) {
  const { start, end } = dateRangeForPhotos(photos, dateRange);

  const selectedPhotoIndex = selectedPhoto
    ? photos.findIndex(photo => photo.id === selectedPhoto.id)
    : undefined;

  return (
    <div className={cc(
      'flex flex-col gap-y-0.5',
      'xs:grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4',
    )}>
      {entity}
      <span className={cc(
        'inline-flex gap-2 items-center self-start',
        'uppercase text-dim',
        'sm:col-span-2 md:col-span-1 lg:col-span-2',
      )}>
        {selectedPhotoIndex !== undefined
          // eslint-disable-next-line max-len
          ? `${entityVerb} ${selectedPhotoIndex + 1} of ${count ?? photos.length}`
          : entityDescription}
        {selectedPhotoIndex === undefined &&
          <ShareButton path={sharePath} dim />}
      </span>
      <span className={cc(
        'hidden sm:inline-block',
        'text-right uppercase',
        'text-dim',
      )}>
        {start === end
          ? start
          : <>{start}<br />– {end}</>}
      </span>
    </div>
  );
}
