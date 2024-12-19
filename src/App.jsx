
    import React, { useState } from 'react';
    import styled from 'styled-components';

    const CommandForm = styled.form`
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

    const FormGroup = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const Label = styled.label`
      margin-bottom: 5px;
      font-weight: bold;
    `;

    const Input = styled.input`
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    `;

    const Description = styled.div`
      font-size: 0.9rem;
      color: #777;
      margin-top: 5px;
    `;

    const SubmitButton = styled.input`
      padding: 12px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    `;

    function App() {
      const [commands, setCommands] = useState('');
      const [config, setConfig] = useState('');
      const [showCommandsModal, setShowCommandsModal] = useState(false);

      const handleCommandsChange = (e) => {
        setCommands(e.target.value);
      };

      const handleConfigChange = (e) => {
        setConfig(e.target.value);
      };

      const handleDownload = (content, filename, contentType) => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      const handleDownloadCommands = () => {
        handleDownload(commands, 'Commands.dat', 'text/plain');
      };

      const handleDownloadConfig = () => {
        handleDownload(config, 'Config.json', 'application/json');
      };

      const handleOpenCommandsModal = () => {
        setShowCommandsModal(true);
      };

      const handleCloseCommandsModal = () => {
        setShowCommandsModal(false);
      };

      const handleCommandFormSubmit = (e) => {
        e.preventDefault();
        let generatedCommands = '';
        for (const element of e.target.elements) {
          if (element.name && element.value) {
            if (element.type === 'radio' && element.checked) {
              generatedCommands += `${element.name} ${element.value}\n`;
            } else if (element.type !== 'radio') {
              generatedCommands += `${element.name} ${element.value}\n`;
            }
          }
        }
        setCommands(generatedCommands);
        setShowCommandsModal(false);
      };

      return (
        <div className="container">
          <h1>Unturned Server Creator</h1>
          <button onClick={handleOpenCommandsModal}>Open Commands.dat Editor</button>
          <div className="form-group">
            <label>Config.json Content:</label>
            <textarea
              rows="10"
              value={config}
              onChange={handleConfigChange}
              placeholder="Enter config here..."
            />
          </div>
          <button onClick={handleDownloadConfig}>Download Config.json</button>
          <h2>Preview</h2>
          <div>
            <h3>Commands.dat Preview:</h3>
            <pre>{commands}</pre>
          </div>
          <div>
            <h3>Config.json Preview:</h3>
            <pre>{config}</pre>
          </div>

          {showCommandsModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Commands.dat Editor</h2>
                <CommandForm onSubmit={handleCommandFormSubmit}>
                  <FormGroup>
                    <Label htmlFor="Admin">Admin</Label>
                    <Input type="text" id="Admin" name="Admin" />
                    <Description>Adds the specified player to the list of users with administrator privileges. Syntax: [SteamID | Player]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Admins">Admins</Label>
                    <div className="radio-group">
                      <input type="radio" id="Admins_true" name="Admins" value="admins" />
                      <label htmlFor="Admins_true">True</label>
                    </div>
                    <Description>Outputs a list of the server's administrators to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Airdrop">Airdrop</Label>
                    <div className="radio-group">
                      <input type="radio" id="Airdrop_true" name="Airdrop" value="airdrop" />
                      <label htmlFor="Airdrop_true">True</label>
                    </div>
                    <Description>Immediately forces a dropship to fly over the map and perform an airdrop.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="AllowP2PRelay">AllowP2PRelay</Label>
                    <Input type="text" id="AllowP2PRelay" name="AllowP2PRelay" />
                    <Description>Toggles usage of the ISteamNetworking member function AllowP2PPacketRelay. Syntax: <i>boolean</i> Default: 1</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Animal">Animal</Label>
                    <Input type="text" id="Animal" name="Animal" />
                    <Description>Spawns an animal in front of the specified player. If a player is not specified, then the animal will spawn in front of the executing player. Syntax: [SteamID | Player]/[AnimalID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Ban">Ban</Label>
                    <Input type="text" id="Ban" name="Ban" />
                    <Description>Adds the specified player to the list of users that are banned from the server. If a player is specified but the other parameters are left blank, they will be banned with an "unspecified" reason for 31,536,000 seconds (365 days). Syntax: [SteamID | Player]/[Reason]/[Duration]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Bans">Bans</Label>
                    <div className="radio-group">
                      <input type="radio" id="Bans_true" name="Bans" value="bans" />
                      <label htmlFor="Bans_true">True</label>
                    </div>
                    <Description>Outputs a list of the server's player bans to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Bind">Bind</Label>
                    <Input type="text" id="Bind" name="Bind" />
                    <Description>Binds a specific internal IP to the socket. Syntax: [IP] Default: 0.0.0.0</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Chatrate">Chatrate</Label>
                    <Input type="number" id="Chatrate" name="Chatrate" />
                    <Description>Assigns a cooldown between chat messages, in seconds. Syntax: [Number] Default: 0.25 Min: 0 Max: 60</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Cheats">Cheats</Label>
                    <div className="radio-group">
                      <input type="radio" id="Cheats_true" name="Cheats" value="cheats" />
                      <label htmlFor="Cheats_true">True</label>
                    </div>
                    <Description>Allows the usage of cheat commands.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Cycle">Cycle</Label>
                    <Input type="number" id="Cycle" name="Cycle" />
                    <Description>Assigns the length of the day/night cycle in seconds. Syntax: [Number] Default: 3600</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Day">Day</Label>
                    <div className="radio-group">
                      <input type="radio" id="Day_true" name="Day" value="day" />
                      <label htmlFor="Day_true">True</label>
                    </div>
                    <Description>Sets the current time to daytime.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Debug">Debug</Label>
                    <div className="radio-group">
                      <input type="radio" id="Debug_true" name="Debug" value="debug" />
                      <label htmlFor="Debug_true">True</label>
                    </div>
                    <Description>Outputs information on the state of the server, to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="EffectUI">EffectUI</Label>
                    <Input type="text" id="EffectUI" name="EffectUI" />
                    <Description>Spawns a UI effect for the executing player. Syntax: [EffectID]/[Token]...</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Experience">Experience</Label>
                    <Input type="text" id="Experience" name="Experience" />
                    <Description>Gives a player some experience points. If a player is not specified, then the executing player will receive the experience. Syntax: [SteamID | Player]/[Experience]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Filter">Filter</Label>
                    <div className="radio-group">
                      <input type="radio" id="Filter_true" name="Filter" value="filter" />
                      <label htmlFor="Filter_true">True</label>
                    </div>
                    <Description>Filters out players with non-English, non-alphanumeric names.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Flag">Flag</Label>
                    <Input type="text" id="Flag" name="Flag" />
                    <Description>Sets a player's flag. If a player is not specified, then the flag will be set for the executing player. Syntax: [SteamID | Player]/[Flag]/[Value]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="GameMode">GameMode</Label>
                    <Input type="text" id="GameMode" name="GameMode" />
                    <Description>Assigns the game mode of the server. Syntax: [Class Name]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Give">Give</Label>
                    <Input type="text" id="Give" name="Give" />
                    <Description>Gives a player an item. If a player is not specified, then the item will be given to the executing player. If an amount is not specified, then one item will be given. Syntax: [SteamID | Player]/[ItemID | ItemName | ItemFilename]/[Amount]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Gold">Gold</Label>
                    <div className="radio-group">
                      <input type="radio" id="Gold_true" name="Gold" value="gold" />
                      <label htmlFor="Gold_true">True</label>
                    </div>
                    <Description>Marks the server as joinable only by Gold members.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="GSLT">GSLT</Label>
                    <Input type="text" id="GSLT" name="GSLT" />
                    <Description>Sets the game server login token. Syntax: [Login Token]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Help">Help</Label>
                    <Input type="text" id="Help" name="Help" />
                    <Description>Outputs information on commands, to the server console. Syntax: [Command]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Hide_Admins">Hide_Admins</Label>
                    <div className="radio-group">
                      <input type="radio" id="Hide_Admins_true" name="Hide_Admins" value="hide_admins" />
                      <label htmlFor="Hide_Admins_true">True</label>
                    </div>
                    <Description>Hides the visibility of admin labels from players.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Kick">Kick</Label>
                    <Input type="text" id="Kick" name="Kick" />
                    <Description>Disconnects the specified player from the server. If a player is specified but the other parameter is left blank, they will be kicked with an "unspecified" reason. Syntax: [SteamID | Player]/[Reason]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Kill">Kill</Label>
                    <Input type="text" id="Kill" name="Kill" />
                    <Description>Kills the specified player in-game. Syntax: [SteamID | Player]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Loadout">Loadout</Label>
                    <Input type="text" id="Loadout" name="Loadout" />
                    <Description>Gives players who are using the corresponding skillset each specified item when spawning. A skillset ID of 255 would apply to all skillsets. Syntax: [SkillsetID]/[ItemID]...</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Log">Log</Label>
                    <Input type="text" id="Log" name="Log" />
                    <Description>Assigns the console log options. Syntax: [Chat Y/N]/[Join/Leave Y/N]/[Death Y/N]/[Anticheat Y/N] Default: N/N/N/N</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Map">Map</Label>
                    <Input type="text" id="Map" name="Map" />
                    <Description>Sets the map that the server loads on startup. Syntax: [Level] Default: PEI</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="MaxPlayers">MaxPlayers</Label>
                    <Input type="number" id="MaxPlayers" name="MaxPlayers" />
                    <Description>Sets the maximum number of connections the server is willing to accept. Syntax: [Number] Default: 8 Min: 1 Max: 200</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Mode">Mode</Label>
                    <Input type="text" id="Mode" name="Mode" />
                    <Description>Assigns the difficulty of the server. Syntax: [Easy | Normal | Hard] Default: Normal</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Modules">Modules</Label>
                    <div className="radio-group">
                      <input type="radio" id="Modules_true" name="Modules" value="modules" />
                      <label htmlFor="Modules_true">True</label>
                    </div>
                    <Description>Outputs a list of the loaded modules, to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Name">Name</Label>
                    <Input type="text" id="Name" name="Name" />
                    <Description>Assigns the name of the server as shown on the server list. Syntax: [Text] Default: Unturned Min: 5 Max: 50</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Night">Night</Label>
                    <div className="radio-group">
                      <input type="radio" id="Night_true" name="Night" value="night" />
                      <label htmlFor="Night_true">True</label>
                    </div>
                    <Description>Sets the current time to night.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Owner">Owner</Label>
                    <Input type="text" id="Owner" name="Owner" />
                    <Description>Sets the owner of the server. Syntax: [SteamID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Password">Password</Label>
                    <Input type="text" id="Password" name="Password" />
                    <Description>Assigns the password required for entry into the server. Syntax: [Text]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Permit">Permit</Label>
                    <Input type="text" id="Permit" name="Permit" />
                    <Description>Adds the specified player to the list of users allowed to join the server. Syntax: [SteamID]/[Tag]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Permits">Permits</Label>
                    <div className="radio-group">
                      <input type="radio" id="Permits_true" name="Permits" value="permits" />
                      <label htmlFor="Permits_true">True</label>
                    </div>
                    <Description>Outputs a list of the players permitted to join the server, to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Perspective">Perspective</Label>
                    <Input type="text" id="Perspective" name="Perspective" />
                    <Description>Assigns the perspective of the server. Syntax: [First | Third | Both | Vehicle] Default: First</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Players">Players</Label>
                    <div className="radio-group">
                      <input type="radio" id="Players_true" name="Players" value="players" />
                      <label htmlFor="Players_true">True</label>
                    </div>
                    <Description>Outputs a list of the current players on the server, to the server console.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Port">Port</Label>
                    <Input type="number" id="Port" name="Port" />
                    <Description>Assigns the port of the server. Syntax: [Number] Default: 27015</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="PvE">PvE</Label>
                    <div className="radio-group">
                      <input type="radio" id="PvE_true" name="PvE" value="pve" />
                      <label htmlFor="PvE_true">True</label>
                    </div>
                    <Description>Disables player-versus-player combat, in favor of player-versus-environment combat.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Quest">Quest</Label>
                    <Input type="text" id="Quest" name="Quest" />
                    <Description>Gives a player a quest flag. If a player is not specified, then the executing player is given the quest flag. Syntax: [SteamID | Player]/[Quest]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Queue_Size">Queue_Size</Label>
                    <Input type="number" id="Queue_Size" name="Queue_Size" />
                    <Description>Sets the maximum number of queued connections the server is willing to hold on to. Syntax: [Number] Min: 0 Max: 64</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Reload">Reload</Label>
                    <Input type="text" id="Reload" name="Reload" />
                    <Description>Reloads an asset specified by its GUID, or the contents of a directory. Syntax: [GUID | Directory]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Reputation">Reputation</Label>
                    <Input type="text" id="Reputation" name="Reputation" />
                    <Description>Gives a player some reputation. If a player is not specified, then reputation is given to the executing player. Syntax: [SteamID | Player]/[Reputation]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="ResetConfig">ResetConfig</Label>
                    <div className="radio-group">
                      <input type="radio" id="ResetConfig_true" name="ResetConfig" value="resetconfig" />
                      <label htmlFor="ResetConfig_true">True</label>
                    </div>
                    <Description>Resets the config file to the default values.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Save">Save</Label>
                    <div className="radio-group">
                      <input type="radio" id="Save_true" name="Save" value="save" />
                      <label htmlFor="Save_true">True</label>
                    </div>
                    <Description>Forces a proper save of the server state.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Say">Say</Label>
                    <Input type="text" id="Say" name="Say" />
                    <Description>Broadcasts a message to all of the connected clients, via the in-game chat. If an RGB color is not specified, then the color will be 0, 255, 0. Syntax: [Text]/[R]/[G]/[B]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Shutdown">Shutdown</Label>
                    <Input type="text" id="Shutdown" name="Shutdown" />
                    <Description>Properly saves the server state, disconnects the clients, and closes the server. If the command is executed but no optional parameters are provided, the shutdown will occur immediately with no explanation provided to the disconnected clients. Syntax: [Delay]/[Explanation]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Slay">Slay</Label>
                    <Input type="text" id="Slay" name="Slay" />
                    <Description>Kills the specified player in-game, and then permanently bans them. If a player is specified but no optional parameters are provided, then the slayed player will be banned for 31,536,000 seconds (365 days) for an "unspecified" reason. Syntax: [SteamID | Player]/[Reason]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Spy">Spy</Label>
                    <Input type="text" id="Spy" name="Spy" />
                    <Description>Requests a screenshot from the target player and saves it on the caller's computer as Spy.jpg. Syntax: [SteamID | Player]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Sync">Sync</Label>
                    <div className="radio-group">
                      <input type="radio" id="Sync_true" name="Sync" value="sync" />
                      <label htmlFor="Sync_true">True</label>
                    </div>
                    <Description>Allows players to share savedata between your servers.</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Teleport">Teleport</Label>
                    <Input type="text" id="Teleport" name="Teleport" />
                    <Description>Teleports a player to either another player, a location node, a waypoint (via "wp"), or a bed. Syntax: [SteamID | Player]/[SteamID | Player | Location]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Time">Time</Label>
                    <Input type="number" id="Time" name="Time" />
                    <Description>Assigns the current time of the day-night cycle, in seconds. Syntax: [Number]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Timeout">Timeout</Label>
                    <Input type="number" id="Timeout" name="Timeout" />
                    <Description>Assigns a maximum ping threshold to the server before a client is kicked. When the command is not entered, then it will default to the value used by Max_Ping_Milliseconds. By default, this is 750 milliseconds. Syntax: [Number] Default: 750 Min: 50 Max: 10000</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Unadmin">Unadmin</Label>
                    <Input type="text" id="Unadmin" name="Unadmin" />
                    <Description>Removes the specified player from the list of users allowed to use admin commands in the chat. Syntax: [SteamID | Player]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Unban">Unban</Label>
                    <Input type="text" id="Unban" name="Unban" />
                    <Description>Removes the specified player from the list of users not allowed to join the server. Syntax: [SteamID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="UnlockNpcAchievement">UnlockNpcAchievement</Label>
                    <Input type="text" id="UnlockNpcAchievement" name="UnlockNpcAchievement" />
                    <Description>Grants a player the specified achievement. Only specific achievements are eligible to be granted. Syntax: [SteamID | Player]/[AchievementID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Unpermit">Unpermit</Label>
                    <Input type="text" id="Unpermit" name="Unpermit" />
                    <Description>Removes the specified player from the list of users permitted to join the server. Syntax: [SteamID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Vehicle">Vehicle</Label>
                    <Input type="text" id="Vehicle" name="Vehicle" />
                    <Description>Spawn a vehicle in front of a player. If a player is not specified, then a vehicle will spawn in front of the executing player. Syntax: [SteamID | Player]/[VehicleID | VehicleGUID | VehicleName | VehicleFilename]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Votify">Votify</Label>
                    <Input type="text" id="Votify" name="Votify" />
                    <Description>Configures voting for the server. By default, voting is disabled outright. Syntax: [Vote Allowed Y/N]/[Pass Cooldown]/[Fail Cooldown]/[Vote Duration]/[Vote Percentage]/[Players]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Weather">Weather</Label>
                    <Input type="text" id="Weather" name="Weather" />
                    <Description>Manipulates the current weather cycle. Syntax: [None | Disable | Storm | Blizzard | GUID]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Welcome">Welcome</Label>
                    <Input type="text" id="Welcome" name="Welcome" />
                    <Description>Sets a welcome message that is shown to clients once they connect. Syntax: [Text]/[R]/[G]/[B]</Description>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Whitelisted">Whitelisted</Label>
                    <div className="radio-group">
                      <input type="radio" id="Whitelisted_true" name="Whitelisted" value="whitelisted" />
                      <label htmlFor="Whitelisted_true">True</label>
                    </div>
                    <Description>Makes the server joinable only be permitted players.</Description>
                  </FormGroup>
                  <SubmitButton type="submit" value="Generate Commands" />
                </CommandForm>
                <button className="close-button" onClick={handleCloseCommandsModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
