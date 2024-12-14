const onRampURL =
  "https://onramp.gatefi.com/?merchantId=dca9f464-40a0-4d0c-bde9-bbcf5a32c265";
const offRampURL =
  "https://offramp.gatefi.com/?merchantId=dca9f464-40a0-4d0c-bde9-bbcf5a32c265";

export const OnRampWizard = ({ address, isOffRamp }: { address: string, isOffRamp: boolean }) => {
  const iframeURL = `${isOffRamp ? offRampURL : onRampURL}&cryptoCurrency=SUI_SUI&wallet=${address}&cryptoAmount=10&walletLock=true`;

  return (
    <>
      <div className='h-full w-full'>
        <iframe
          src={iframeURL}
          className='max-h-[760px] h-full w-full'
        ></iframe>
      </div>
    </>
  );
};
