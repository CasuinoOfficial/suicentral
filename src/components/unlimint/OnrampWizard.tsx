const UnlimintURL =
  "https://onramp.gatefi.com/?merchantId=dca9f464-40a0-4d0c-bde9-bbcf5a32c265";

export const OnRampWizard = ({ address }: { address: string }) => {
  const iframeURL = `${UnlimintURL}&cryptoCurrency=SUI&wallet=${address}`;

  return (
    <>
      <div className="h-full w-full">
        <iframe src={iframeURL} className="max-h-[760px] h-full w-full"></iframe>
      </div>
    </>
  );
};