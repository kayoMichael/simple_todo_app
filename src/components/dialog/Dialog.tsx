import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DialogForm = ({ handleSubmit, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Items</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Add Items</DialogTitle>
            <DialogDescription>
              Add Items to the Table here with name and Priority
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Viktoriya Serebryakova"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                name="priority"
                type="number"
                placeholder="1"
                min="1"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
