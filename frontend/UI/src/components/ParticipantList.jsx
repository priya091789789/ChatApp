// src/components/ParticipantList.jsx

const ParticipantList = ({ participants }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold text-white">Participants:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <li key={index} className="text-sm">{participant}</li>
            ))
          ) : (
            <li className="text-sm">No participants yet.</li>
          )}
        </ul>
      </div>
    );
  };
  
  export default ParticipantList;
  