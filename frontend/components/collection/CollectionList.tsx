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
    <AnimatedDiv className="ml-10 flex flex-col gap-2">
      {collections?.map((collection, idx) => (
        <CollectionItem key={idx} collection={collection} />
      ))}
    </AnimatedDiv>
  );
};

export default CollectionList;

export const mockCollections: FormattedCollection[] = [
  {
    id: "col_001",
    name: "RPG Masterpieces",
    created_at: new Date("2024-01-15T10:30:00Z"),
    updated_at: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "col_002",
    name: "Indie Gems",
    created_at: new Date("2024-02-20T14:15:00Z"),
    updated_at: new Date("2024-02-20T14:15:00Z"),
  },
  {
    id: "col_003",
    name: "Action Adventure Classics",
    created_at: new Date("2024-03-10T09:00:00Z"),
    updated_at: new Date("2024-03-10T09:00:00Z"),
  },
];
