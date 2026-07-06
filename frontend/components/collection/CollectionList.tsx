import {
  FormattedCollection,
  FormattedDetailedCollection,
} from "@/types/collection";
import CollectionItem from "./CollectionItem";
import AnimatedDiv from "../motion/AnimatedDiv";

interface CollectionListProps {
  collections: FormattedDetailedCollection[];
}
const CollectionList = ({ collections }: CollectionListProps) => {
  return (
    <AnimatedDiv className="flex flex-col gap-2">
      {collections?.map((collection, idx) => (
        <CollectionItem key={idx} collection={collection} />
      ))}
    </AnimatedDiv>
  );
};

export default CollectionList;
