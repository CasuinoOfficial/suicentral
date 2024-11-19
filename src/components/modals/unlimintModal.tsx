import { OnRampWizard } from "../unlimint/OnrampWizard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentAccount } from "@mysten/dapp-kit";

interface BuyCryptoModalProps {
  showBuyCrypto: boolean;
  handleShowBuyCrypto: () => void;
}

const UnlimintModal = ({
  showBuyCrypto,
  handleShowBuyCrypto,
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
          <DialogTitle className="h-[20px]">Buy Crypto</DialogTitle>
        </DialogHeader>
        <DialogDescription className="h-[20px]">Buy Crypto with your credit card</DialogDescription>
        <div className="h-full">
        <OnRampWizard address={currentAccount.address} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlimintModal;