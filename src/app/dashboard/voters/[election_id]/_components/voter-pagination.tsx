'use client';
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/pagination';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
export default function VoterPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <Pagination className="mt-6">
        {currentPage <= 1 ? (
          <PaginationPrevious />
        ) : (
          <PaginationPrevious href={createPageURL(currentPage - 1)} />
        )}

        <PaginationList>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            if (position === 'middle') {
              return <PaginationGap key={index} />;
            }
            return (
              <PaginationPage
                key={index}
                current={currentPage === page}
                href={createPageURL(page)}
              >
                {page}
              </PaginationPage>
            );
          })}
        </PaginationList>
        {currentPage >= totalPages ? (
          <PaginationNext />
        ) : (
          <PaginationNext href={createPageURL(currentPage + 1)} />
        )}
      </Pagination>
    </>
  );
}
