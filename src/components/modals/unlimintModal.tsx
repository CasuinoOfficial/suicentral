import { OnRampWizard } from "../unlimint/OnrampWizard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { DialogClose } from "@radix-ui/react-dialog";

interface BuyCryptoModalProps {
  showBuyCrypto: boolean;
  handleShowBuyCrypto: () => void;
  isOffRamp: boolean
}

const UnlimintModal = ({
  showBuyCrypto,
  handleShowBuyCrypto,
  isOffRamp
}: BuyCryptoModalProps) => {
  const currentAccount = useCurrentAccount();
  if(!currentAccount || !currentAccount.address) {
    // add toast
    return;
  }
  
  return (
    <Dialog open={showBuyCrypto} onOpenChange={handleShowBuyCrypto}>
      <DialogContent className="h-full bg-[#0c112a] flex flex-col flex-start">
        <DialogHeader>
          <DialogTitle className="h-[20px]">{isOffRamp ? "Sell" : "Buy"} Crypto</DialogTitle>
        </DialogHeader>
        <DialogDescription 
          className="h-[20px] flex flex-row justify-between"
        >
          <span>...for fiat.</span> 
          <DialogClose><span>back</span></DialogClose>
        </DialogDescription>
        <div className="h-full">
        <OnRampWizard address={currentAccount.address} isOffRamp={isOffRamp} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlimintModal;