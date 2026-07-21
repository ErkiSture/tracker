import { saveEntry } from "@/shared/services/entryService";
import * as entryRepository from "@/shared/storage/entryRepository";

const mockedRepository = entryRepository as jest.Mocked<typeof entryRepository>

describe("entryService", () => {
  it("rejects invalid ratings", async () => {
    await expect(
      saveEntry({
        mood: 11,
        energy: 5,
        productivity: 7,
        comment: null
      })
    ).rejects.toThrow();

    expect(entryRepository.saveEntry).toHaveBeenCalledTimes(0)
  });

  it("accepts valid ratings", async () => {
    await expect(
      saveEntry({
        mood: 10,
        energy: 5,
        productivity: 7,
        comment: null 
      })
    ).resolves.not.toThrow();

    expect(entryRepository.saveEntry).toHaveBeenCalled();
  })

  it("rejects comments that are too long", async () => {
    await expect(
      saveEntry({
        mood: 10,
        energy: 5,
        productivity: 7,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec pretium risus, eu porta lectus. Donec porta erat dui, sed accumsan neque fringilla nec. Aliquam diam ante, posuere eu elementum in, auctor sed lacus. Nulla leo lorem, efficitur quis massa hendrerit, fermentum ullamcorper ex. Donec lobortis ac tellus non cursus. Quisque volutpat purus sit amet porta bibendum. Aenean in orci eget risus ultrices suscipit ac et odio. Etiam venenatis placerat eros a hendrerit. Mauris aliquet ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec pretiu" 
      })
    ).rejects.toThrow();
  })

  it("rejects saving entry if entry for specified date already exists", async () => {
    mockedRepository.getEntryByDate.mockResolvedValue(true);

    await expect(
      saveEntry({
        mood: 10,
        energy: 5,
        productivity: 7,
        comment: "Lorem ipsum dolor sit amet, consectetur" 
      })
    ).rejects.toThrow()
  })
  
})