import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { constants } from "@/lib/constants";
import { createQueryString } from "@/lib/queryStringBuilder";

interface ItemsPaginationProps {
  itemsAmount: number;
}

const ItemsPagination = ({ itemsAmount }: ItemsPaginationProps) => {
  const router = useRouter();
  const gap = constants.gap;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  return (
    <Pagination
      simple
      current={itemsAmount > 0 ? page : 1}
      total={itemsAmount > 0 ? Math.ceil(itemsAmount / gap) * 10 : 1}
      onChange={(newPage) =>
        router.push(
          pathname +
            "?" +
            createQueryString(searchParams, "page", newPage.toString()),
        )
      }
    />
  );
};

export default ItemsPagination;
