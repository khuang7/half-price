import React from "react";
import { trpc } from "./trpc";
import { ProductList } from "./ProductList";
import { Loader } from "./Loader";

type Props = {};

export const ItemSearch = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<any[]>([]);

  const { data, isLoading, isError, error, isFetching, refetch } = trpc.useQuery(["fetch-product", search]);

  const onSearchItem = (event: any) => {
    event.preventDefault();
    console.log("calls onSearchItem");
    refetch();
    setLoading(true);
  };

  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <h2 className="inline sm:block">Search for your coles product and check it's price!</h2> <p className="inline sm:block"></p>
          </div>
          <form className="mt-10 max-w-md" onSubmit={onSearchItem}>
            <div className="flex gap-x-4">
              <label htmlFor="product-details" className="sr-only">
                Product
              </label>
              <input value={search} onChange={handleInputChange} id="product-details" name="product" type="text" required className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Enter product" />
              <button type="submit" className="flex-none rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
      {data && data.length > 0 && <ProductList products={data} />}
    </div>
  );
};
