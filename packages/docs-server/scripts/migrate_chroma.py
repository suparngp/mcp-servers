#!/usr/bin/env python3
"""
Migrate ChromaDB collections from one instance to another.
Usage: python migrate_chroma.py
"""

import chromadb
from chromadb.config import Settings
import sys

# Source and target configurations
SOURCE_HOST = "localhost"
SOURCE_PORT = 7777
TARGET_HOST = "localhost"
TARGET_PORT = 8000

def migrate_collections():
    """Migrate all collections from source to target ChromaDB."""

    print(f"Connecting to source ChromaDB at {SOURCE_HOST}:{SOURCE_PORT}...")
    source_client = chromadb.HttpClient(
        host=SOURCE_HOST,
        port=SOURCE_PORT,
        settings=Settings(allow_reset=False)
    )

    print(f"Connecting to target ChromaDB at {TARGET_HOST}:{TARGET_PORT}...")
    target_client = chromadb.HttpClient(
        host=TARGET_HOST,
        port=TARGET_PORT,
        settings=Settings(allow_reset=False)
    )

    # List all collections from source
    try:
        source_collections = source_client.list_collections()
        print(f"\nFound {len(source_collections)} collections in source:")
        for col in source_collections:
            print(f"  - {col.name}")
    except Exception as e:
        print(f"Error listing source collections: {e}")
        return False

    if not source_collections:
        print("No collections to migrate.")
        return True

    # Migrate each collection
    for source_col in source_collections:
        collection_name = source_col.name
        print(f"\n{'='*60}")
        print(f"Migrating collection: {collection_name}")
        print(f"{'='*60}")

        try:
            # Get source collection
            source_collection = source_client.get_collection(name=collection_name)

            # Get count
            count = source_collection.count()
            print(f"Source collection has {count} documents")

            if count == 0:
                print("Skipping empty collection")
                continue

            # Get all data from source (with embeddings)
            print("Fetching all documents from source...")
            data = source_collection.get(
                include=['embeddings', 'documents', 'metadatas']
            )

            print(f"Retrieved {len(data['ids'])} documents with embeddings")

            # Get collection metadata
            source_metadata = source_collection.metadata or {}

            # Create or get target collection
            print(f"Creating/getting collection in target...")
            try:
                target_collection = target_client.get_collection(name=collection_name)
                print(f"Collection already exists in target (has {target_collection.count()} documents)")

                # Ask user if they want to overwrite
                response = input(f"Overwrite existing collection '{collection_name}'? (y/N): ").strip().lower()
                if response != 'y':
                    print("Skipping this collection")
                    continue

                # Delete and recreate
                print("Deleting existing collection...")
                target_client.delete_collection(name=collection_name)

            except Exception:
                pass  # Collection doesn't exist, that's fine

            # Create collection with same metadata
            print("Creating collection in target...")
            target_collection = target_client.create_collection(
                name=collection_name,
                metadata=source_metadata
            )

            # Add data to target in batches (to handle large collections)
            batch_size = 1000
            total_docs = len(data['ids'])

            for i in range(0, total_docs, batch_size):
                end_idx = min(i + batch_size, total_docs)
                batch_ids = data['ids'][i:end_idx]
                batch_embeddings = data['embeddings'][i:end_idx] if data['embeddings'] is not None else None
                batch_documents = data['documents'][i:end_idx] if data['documents'] is not None else None
                batch_metadatas = data['metadatas'][i:end_idx] if data['metadatas'] is not None else None

                print(f"Adding batch {i//batch_size + 1}/{(total_docs + batch_size - 1)//batch_size} ({len(batch_ids)} documents)...")

                target_collection.add(
                    ids=batch_ids,
                    embeddings=batch_embeddings,
                    documents=batch_documents,
                    metadatas=batch_metadatas
                )

            # Verify migration
            target_count = target_collection.count()
            print(f"✓ Migration complete! Target collection has {target_count} documents")

            if target_count != count:
                print(f"⚠ WARNING: Document count mismatch! Source: {count}, Target: {target_count}")

        except Exception as e:
            print(f"✗ Error migrating collection '{collection_name}': {e}")
            import traceback
            traceback.print_exc()
            continue

    print(f"\n{'='*60}")
    print("Migration complete!")
    print(f"{'='*60}")
    return True

if __name__ == "__main__":
    try:
        success = migrate_collections()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\nMigration cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\nFatal error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
