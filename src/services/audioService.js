import { storageService } from './async-storage-service';
import { utilService } from './utilService';

const KEY = 'audioDB';

export const audioService = {
  query,
  getById,
  deleteAudio,
  save,
};

const gDefaultAudios = [
  {
    _id: utilService.makeId(),
    title: 'Tambourine',
    src: './audios/tambourine.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'UUHO vocal',
    src: './audios/UUHO VOC.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'Lead vocal',
    src: './audios/LEAD 1.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'Lead vocal 2',
    src: './audios/B VOC.mp3',
    color: utilService.getRGBARandomColor(),
  },

  {
    _id: utilService.makeId(),
    title: 'Bring in the drums',
    src: './audios/DRUMS.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'Extra HE HE vocals',
    src: './audios/HE HE VOC.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'Very high vocal',
    src: './audios/HIGH VOC.mp3',
    color: utilService.getRGBARandomColor(),
  },
  {
    _id: utilService.makeId(),
    title: 'Some Jibrish for the rythm',
    src: './audios/JIBRISH.mp3',
    color: utilService.getRGBARandomColor(),
  },
];

var gAudios = _loadAudios();

function _loadAudios() {
  let audios = storageService.query(KEY);
  if (!audios || !audios.length) audios = gDefaultAudios;
  storageService.put(KEY, audios);
  return audios;
}

const data = {
  timeLine: [
    {
      name: 'tambourine',
      startTime: 0,
      length: 5,
      channel: 1,
    },
  ],
};
let audio = new Audio('./audios/B VOC.mp3');
let trackLength = 100; // each number represnts second / 10
let currTrackTime = 0;

const startTime = {
  row1: 1,
  row2: 0,
  row3: 0,
  row4: 0,
  row5: 0,
  row6: 0,
  row7: 0,
  row8: 0,
};

// Loop
let intr = setInterval(() => {
  currTrackTime++;

  // if (currTrackTime > startTime.row1) row1Audio.play();
  if (currTrackTime === trackLength) clearInterval(intr);
}, 100);

async function query() {
  try {
    const audios = gAudios;
    console.log(audios);
    return Promise.resolve(audios);
  } catch (err) {
    console.log(err);
  }
}

async function getById(audioId) {
  try {
    const res = await storageService.get(KEY, audioId);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteAudio(audioId) {
  try {
    const res = await storageService.remove(KEY, audioId);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function save(audio) {
  try {
    if (!audio._id) {
      const addedAudio = await storageService.post(KEY, audio);
      return addedAudio;
    } else {
      const updatedAudio = await storageService.put(KEY, audio);
      return updatedAudio;
    }
  } catch (err) {
    console.log(err);
  }
  // const savedAudio = audio._id ? updateAudio(audio) : addAudio(audio)
  // return savedAudio
}
