'use client';
import { Select } from '@/components/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function UpdatePeriod() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((range) => {
    const params = new URLSearchParams(searchParams);

    if (range) {
      params.set('period', range);
    } else {
      params.delete('period');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div>
      <Select
        name="period"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        defaultValue={"last-week"}
        aria-label="period"
      >
        <option value="last-week">
          Last week
        </option>
        <option value="last-two-week">Last two weeks</option>
        <option value="last-month">Last month</option>
      </Select>
    </div>
  );
}
