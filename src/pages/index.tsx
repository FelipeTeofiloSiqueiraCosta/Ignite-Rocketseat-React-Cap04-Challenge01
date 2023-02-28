import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ResponseProps {
  after: string;
  data: {
    description: string;
    id: string;
    title: string;
    ts: number;
    url: string;
  }[];
}

export default function Home(): JSX.Element {
  const fetchProjects = async ({
    pageParam = undefined,
  }): Promise<ResponseProps> => {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: 'images',

    queryFn: fetchProjects,
    getNextPageParam: lastPage => lastPage.after,
  });

  const formattedData = useMemo(() => {
    let response = [];
    if (data) {
      response = data.pages.map(pg => pg.data);
    }

    return response.flat();
  }, [data]);

  if (isLoading) {
    return <Loading key="loadingCards" />;
  }

  if (isError) {
    return <Error key="errorCards" />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        <br />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            name={isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
