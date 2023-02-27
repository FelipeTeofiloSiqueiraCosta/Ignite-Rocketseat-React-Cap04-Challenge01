import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="pGray.900" maxWidth="900px" maxH={400} w="auto">
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={0}
          >
            <Image src={imgUrl} title={imgUrl} maxWidth="900px" maxH={400} />
          </ModalBody>

          <ModalFooter backgroundColor="gray.500">
            <Link href={imgUrl} width="100%">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
