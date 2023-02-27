import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imgSelected, setimgSelected] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setimgSelected(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="2.5">
        {cards.map(card => {
          return (
            <Card
              data={card}
              key={`card${card.id}`}
              viewImage={url => handleViewImage(url)}
            />
          );
        })}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={imgSelected}
        isOpen={isOpen}
        onClose={onClose}
        key="modalViewImage"
      />
    </>
  );
}
