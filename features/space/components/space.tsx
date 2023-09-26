type SpaceProps = {
  spaceId: string;
  spaceName: string;
};

export async function Space({ spaceId, spaceName }: SpaceProps) {
  return (
    <div>
      <p>
        {spaceName} - {spaceId}
      </p>
    </div>
  );
}
