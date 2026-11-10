// ============================================================
// Мануал: Бастионы (правила бастионов игроков, DMG 2024)
// Текст на английском — как в источнике.
// ============================================================
registerManual({
  id: 'bastions',
  title: 'Бастионы',
  subtitle: 'Bastions · D&D 5e (2024)',
  category: 'Бастионы',
  lang: 'en',
  summary: 'Ходы бастиона, базовые и особые постройки, наёмники, события',
  source: 'https://dnd2024.wikidot.com/bastions',
  // слова для поиска (в т.ч. русские: сам текст английский)
  tags: ['бастион', 'бастионы', 'bastion', 'крепость', 'форпост', 'постройки', 'сооружения', 'facility', 'facilities',
         'наёмники', 'hireling', 'приказы', 'orders', 'события', 'events', 'особые постройки', 'special facilities',
         'базовые постройки', 'basic facilities', 'призрачные', 'haunted'],
  html: `
<p>A Bastion is a location that belongs to a player character: a home, a stronghold, and a place of power that the character develops over the course of a campaign. A Bastion offers a character temporary refuge from the dangerous world of adventuring, and it provides opportunities for a character to craft magic items, conduct research, harvest poisons, build ships, and carry out a range of other activities.</p>
<p>As DM, you decide whether Bastions are available in a campaign. Bastions are best suited to campaigns that allow characters to return to their Bastions during intervals when they’re not actively adventuring. Not every character needs to have a Bastion. It’s fine for some players in your campaign to opt in to Bastion ownership and others to opt out.</p>
<p>There’s no need to choose between going on adventures and commanding a Bastion; a character can do both at once. A Bastion has special facilities that generate benefits, and these facilities can also undertake projects while the character is otherwise occupied.</p>
<p>Most importantly, a Bastion is a creative playground for a player and a shared storytelling space in the campaign. Be as permissive as you can with the stories players tell in their Bastions, but players should know their control might be limited by the campaign’s larger story, which you strive to make fun for everyone.</p>
<h2><strong>Gaining a Bastion</strong></h2>
<p>If you allow Bastions in your campaign, characters acquire their Bastions when they reach level 5. You and the players can decide together how these Bastions come into being. A character might inherit or receive a parcel of land on which to build their Bastion, or they might take a preexisting structure and refurbish it. It’s fair to assume that work has been going on behind the scenes of the campaign during a character’s early adventuring career, so the Bastion is ready when the character reaches level 5.</p>
<p>The shape, style, and function of a character’s Bastion are up to the player to determine. For example, a Wizard might build a tower, a Cleric might establish a shrine, a Fighter might build a fortified keep or similar stronghold, and a Rogue might establish a guildhall or lodge. Characters of other classes might choose one of these forms or combine them—a Paladin’s Bastion might be similar to a Cleric’s shrine but as fortified as a Fighter’s stronghold. And multiple characters can combine their Bastions to form a single large structure (see “Bastion Map”).</p>
<p>Every Bastion has facilities that serve basic needs as well as special ones, such as libraries, menageries, and workshops (see “Basic Facilities” and “Special Facilities”).</p>
<h2><strong>Bastion Turns</strong></h2>
<p>As time passes in the campaign, players take Bastion turns to reflect the activity occurring in their Bastions, whether or not the characters are present. On a Bastion turn, a character can issue orders to the special facilities in their Bastion or issue the Maintain order to the entire Bastion (see “Orders”).</p>
<h3>Frequency of Bastion Turns</h3>
<p>By default, a Bastion turn occurs every 7 days of in-game time. Here are common examples of players taking one or more Bastion turns:</p>
<ul>
<li>The characters are on a long journey away from their Bastions. After the characters have been away for 7 days, you might say, “Time for a Bastion turn. Since you’re not there, we’ll assume you issue the Maintain order for your Bastions.” Then roll for events as described in the “Bastion Events” section in this chapter.</li>
<li>The characters spend 7 days or more in their Bastions between adventures. You might say, “You have six weeks to spend in your Bastions. Go ahead and resolve six Bastion turns.”</li>
<li>The characters return to their Bastions in the midst of an adventure. You might say, “You have just enough time to take a Bastion turn before you leave again in the morning.”</li>
<li>The characters are adventuring near their Bastions and resting in their Bastions at night. You might say, “It’s been a week since your last Bastion turn, so you can take one now.”</li>
</ul>
<p>You can slow the frequency of Bastion turns to better serve the needs of your players and your campaign. For example, if the characters have months between adventures, you can call for a Bastion turn every month instead of every 7 days, so the characters aren’t issuing so many orders or reaping too many benefits at once.</p>
<h2><strong>Bastion Map</strong></h2>
<p>Encourage players to create floor plans of their characters’ Bastions, configuring its facilities as they see fit and using the same techniques you use to create dungeon maps.</p>
<p>In addition to basic and special facilities, a Bastion can have the following features:</p>
<p><strong>Closets.</strong> A basic or special facility can have one or more closets, washrooms, or similar enclosures. The closets must be inside the facility and can’t increase the facility’s area in squares. These features are free.</p>
<p><strong>Corridors, Ramps, and Staircases.</strong> A facility can contain one or more corridors, ramps, or staircases leading to other facilities in the Bastion. These features are free.</p>
<p><strong>Defensive Walls.</strong> A character can add defensive walls around their Bastion. A defensive wall is 20 feet high and may include a walkway along its top, with a means to access it (such as a ladder or lift). Each 5-foot square of defensive wall takes 10 days to build and costs 250 GP. If a character’s Bastion is completely enclosed by defensive walls and it comes under attack (see “Bastion Events” at the end of this chapter), reduce by 2 the number of dice rolled to determine how many Bastion Defenders are lost in the attack.</p>
<p><strong>Doors and Windows.</strong> Each facility comes with one or more doors and shuttered windows, placed wherever the player sees fit. See “Doors” in chapter 3 for kinds of doors to choose from, including locked doors, secret doors, and portcullises. These features are free.</p>
<h2>Mobile Bastions</h2>
<p>The Bastion rules in the Dungeon Master’s Guide assume that characters establish their Bastions in a fixed location and that their adventures might take them away from their Bastions at times, perhaps even for long periods. But in Eberron (and perhaps other settings), characters might establish a permanent base of operations that isn’t linked to a fixed location—maybe on a sailing ship, a lightning rail cart, or even an airship. The DM decides whether to allow characters to establish a mobile Bastion, which uses the following alterations to the normal Bastion rules.</p>
<p>A mobile Bastion has two basic requirements: it must be built in a vehicle form, and one of its special facilities must allow for propulsion. (The Lyrandar Helm, Navigator’s Helm, and Orien Helm fulfill that requirement.) If multiple characters combine their Bastions into a single vehicle, each Bastion must include the same kind of special facility that allows for propulsion, and in order for the vehicle to travel, the characters must all issue the Empower order to those facilities at the same time. In this case, however, the combined Bastion can travel more than 8 hours per day; the facility hirelings can operate the vehicle in shifts. Thus, a combined Bastion with at least three Navigator’s Helm facilities can sail for 24 hours a day as the three hirelings trade off navigation in 8-hour shifts.</p>
<p>If characters are traveling with their mobile Bastions, they can also have encounters and face obstacles just as if they were traveling away from their Bastions. When the DM is planning obstacles for such a journey (as described in the Dungeon Master’s Guide), a potential consequence of an encounter or obstacle is the temporary loss of access to one or more of the Bastion’s facilities, including the facility that allows propulsion.</p>
<p>Players and the DM should work together to create a Bastion map that fits within the chosen vehicle. Facilities can be slightly larger or smaller than the rules in the Dungeon Master’s Guide specify, at the DM’s discretion, in order to fit. A mobile Bastion can’t have defensive walls.</p>
<h3>Combining Bastions</h3>
<p>Two or more players can combine their characters’ Bastions into a single structure. Doing so doesn’t change the number of special facilities each Bastion can have, how those special facilities work, or who issues orders to each Bastion. Each Bastion retains its own hirelings, which can’t be sent to or shared with another Bastion. Bastion Defenders are handled differently: if some event deprives one character’s Bastion of defenders, another character can apply all or some of those losses to their Bastion instead, provided the two Bastions are combined.</p>
<h3>Facility Space</h3>
<p>The amount of space in a basic or special facility determines its maximum area in 5-foot squares, as shown in the Facility Space table. A player can configure the squares of a facility as they please on their Bastion’s map. The squares can be stacked so that a facility’s area is distributed over multiple levels or stories.</p>
<table>
<tbody>
<tr>
<th>Space</th>
<th>Maximum Area</th>
</tr>
<tr>
<td>Cramped</td>
<td>4 Squares</td>
</tr>
<tr>
<td>Roomy</td>
<td>16 Squares</td>
</tr>
<tr>
<td>Vast</td>
<td>36 Squares</td>
</tr>
</tbody></table>
<h2>Haunted Bastions</h2>
<p>The rules for Bastions in the Dungeon Master’s Guide allow characters to establish sanctuaries to rest and accrue resources between adventures, but these redoubts aren’t outside the grasp of the Mists.</p>
<h3>Bastions in the Mists</h3>
<p>Bastions in the Domains of Dread work well in campaigns that focus on a single domain or where Darklords aren’t likely to seal their domains’ borders and cut characters off from their Bastions.</p>
<p>Characters can create Bastions in any domain. The domains of Borca, Darkon, Lamordia, Mordent, and the Shadowlands are well suited to hosting Bastions due to their large size or aloof Darklords. Consider having characters inherit one or more existing structures—such as a ruined fortress, secluded tower, or house recently scoured of ghosts. Should characters adopt such a structure, they can refurbish it to their specifications.</p>
<p>How Darklords respond to Bastions is up to you, but don’t create plots that are hostile to Bastions. Darklords might ignore a Bastion, be curious about it, or use it as one more way to bind characters within their domains.</p>
<h2>Basic Facilities</h2>
<p>A character’s Bastion starts with two free basic facilities, which the character’s player chooses from the Basic Facilities list below. One of the chosen facilities is Cramped, and the other is Roomy (see the Facility Space table). A Bastion can have more than one of each basic facility.</p>
<p><strong>Basic Facilities</strong></p>
<p>Bedroom</p>
<p>Dining Room</p>
<p>Parlor</p>
<p>Courtyard</p>
<p>Kitchen</p>
<p>Storage</p>
<p>A basic facility comes with nonmagical furnishings and decor appropriate for that facility.</p>
<p>Basic facilities don’t have any game effects, but they can inspire roleplaying opportunities and enhance a Bastion’s verisimilitude. A Bastion with a kitchen is functionally the same as one without, but the former gives you and your players a fun setting to start game sessions, have in-character discussions, or introduce new NPCs.</p>
<p>A character can add new basic facilities or enlarge existing ones by spending money and time, as discussed in the sections that follow. Any number of basic facilities can be added or enlarged at the same time. A character doesn’t need to be in their Bastion while basic facilities are being added or enlarged.</p>
<h3>Adding Basic Facilities</h3>
<p>A character can add a basic facility to their Bastion by spending money and time. The cost of adding a basic facility and the time required depend on the facility’s space, as shown on the table below.</p>
<table>
<tbody>
<tr>
<th>Facility Space</th>
<th>Cost</th>
<th>Time Required</th>
</tr>
<tr>
<td>Cramped</td>
<td>500 GP</td>
<td>20 days</td>
</tr>
<tr>
<td>Roomy</td>
<td>1,000 GP</td>
<td>45 days</td>
</tr>
<tr>
<td>Vast</td>
<td>3,000 GP</td>
<td>125 days</td>
</tr>
</tbody></table>
<h3>Enlarging Basic Facilities</h3>
<p>There is no in-game benefit to enlarging a basic facility, but a character might enlarge a facility for cosmetic reasons or to increase the Bastion’s size.</p>
<p>A character can spend money and time to increase the space of a basic facility in their Bastion by one category, as shown on the table below.</p>
<table>
<tbody>
<tr>
<th>Space Increase</th>
<th>Cost</th>
<th>Time Required</th>
</tr>
<tr>
<td>Cramped to Roomy</td>
<td>500 GP</td>
<td>25 days</td>
</tr>
<tr>
<td>Roomy to Vast</td>
<td>2,000 GP</td>
<td>80 days</td>
</tr>
</tbody></table>
<h2><strong>Special Facilities</strong></h2>
<p>Special facilities are Bastion locations where certain activities yield game benefits. A character’s Bastion initially has two special facilities of the character’s choice for which they qualify. Each special facility can be chosen only once unless its description says otherwise.</p>
<p>Unlike basic facilities, special facilities can’t be bought; a character gains them through level advancement. At level 9, a character gains two additional special facilities of their choice for which they qualify; they gain one additional facility at level 13 and another at level 17. The Special Facility Acquisition table shows the total number of special facilities in a character’s Bastion. Each new special facility immediately becomes part of the character’s Bastion when the character reaches the level.</p>
<p>Each time a character gains a level, that character can replace one of their Bastion’s special facilities with another for which the character qualifies.</p>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facilities</th>
</tr>
<tr>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>9</td>
<td>4</td>
</tr>
<tr>
<td>13</td>
<td>5</td>
</tr>
<tr>
<td>17</td>
<td>6</td>
</tr>
</tbody></table>
<h3>Requirements</h3>
<p>Each special facility has a level. A character must be that level or higher to gain that facility. A special facility might also have a prerequisite the character must meet to gain that facility. For example, only a character who can use an Arcane Focus or a tool as a Spellcasting Focus can have an Arcane Study.</p>
<h3>Space</h3>
<p>A special facility occupies a certain amount of space (see “Facility Space”). A player can configure the squares of a special facility as desired on the Bastion’s map. A special facility can be enlarged to grant additional benefits if its description says so.</p>
<h3>Hirelings</h3>
<p>A special facility comes with one or more hirelings who work in the facility, maintain it, and execute Bastion orders there, as described in the next section. A player can assign names and personalities to hirelings in their character’s Bastion using the same tools DMs use to create NPCs.</p>
<p>Each special facility in a Bastion generates enough income to pay the salary of its hirelings. Hirelings follow the orders they’re given and are loyal to the Bastion’s owner.</p>
<h3>Orders</h3>
<p>On a Bastion turn, a character in their Bastion can issue special orders - called Bastion orders - to one or more of their Bastion’s special facilities. A character needn’t issue orders to all the special facilities in their Bastion on a given Bastion turn.</p>
<p>The Maintain order is unusual; it is issued to the whole Bastion rather than to one or more special facilities. If a character isn’t in their Bastion on a given Bastion turn, the Bastion acts as though it were issued the Maintain order on that turn unless the owner can communicate with the Bastion hirelings using the Sending spell or similar magic.</p>
<p>The orders are as follows:</p>
<h4>Craft</h4>
<p>Hirelings in the special facility craft an item that can be made in that facility. During the time required to craft an item, the facility can’t be used to craft anything else, even if a special ability allows the facility to carry out two orders at once. The hirelings have proficiencies with Artisan’s Tools as specified in the facility’s description.</p>
<h4>Empower</h4>
<p>The special facility confers a temporary empowerment to you or someone else.</p>
<h4>Harvest</h4>
<p>Hirelings gather a resource produced in the special facility. During the time required to harvest a resource, the facility can’t be used to harvest anything else, even if a special ability allows the facility to carry out two orders at once.</p>
<h4>Maintain</h4>
<p>All the Bastion’s hirelings focus on maintaining the Bastion rather than executing orders in special facilities. Issuing this order prohibits other orders from being issued to the Bastion on the current Bastion turn. Each time the Maintain order is issued, the DM rolls once on the Bastion Events table. Bastion events are resolved before the next Bastion turn.</p>
<h4>Recruit</h4>
<p>Hirelings recruit creatures to the Bastion. These creatures might include one or more Bastion Defenders, whose main purpose is to defend the Bastion if it is attacked (see “Bastion Events”). The Bastion generates enough income to provide for the needs of its Bastion Defenders.</p>
<h4>Research</h4>
<p>Hirelings in the special facility gather information.</p>
<h4>Trade</h4>
<p>Hirelings buy and sell goods or services stored or produced in this special facility.</p>
<h2>Special Facility Descriptions</h2>
<p>Special facilities are presented in alphabetical order. The Special Facilities table lists all the special facilities presented in this section, along with their prerequisites and orders. Some facilities confer additional benefits, specified in their descriptions.</p>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facility</th>
<th>Prerequisite</th>
<th>Order</th>
</tr>
<tr>
<td>5</td>
<td>Arcane Study</td>
<td>Ability to use an Arcane Focus or a tool as a Spellcasting Focus</td>
<td>Craft</td>
</tr>
<tr>
<td>5</td>
<td>Armory</td>
<td>None</td>
<td>Trade</td>
</tr>
<tr>
<td>5</td>
<td>Barrack</td>
<td>None</td>
<td>Recruit</td>
</tr>
<tr>
<td>5</td>
<td>Garden</td>
<td>None</td>
<td>Harvest</td>
</tr>
<tr>
<td>5</td>
<td>Library</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>5</td>
<td>Sanctuary</td>
<td>Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</td>
<td>Craft</td>
</tr>
<tr>
<td>5</td>
<td>Smithy</td>
<td>None</td>
<td>Craft</td>
</tr>
<tr>
<td>5</td>
<td>Storehouse</td>
<td>None</td>
<td>Trade</td>
</tr>
<tr>
<td>5</td>
<td>Workshop</td>
<td>None</td>
<td>Craft</td>
</tr>
<tr>
<td>9</td>
<td>Gaming Hall</td>
<td>None</td>
<td>Trade</td>
</tr>
<tr>
<td>9</td>
<td>Greenhouse</td>
<td>None</td>
<td>Harvest</td>
</tr>
<tr>
<td>9</td>
<td>Laboratory</td>
<td>None*</td>
<td>Craft</td>
</tr>
<tr>
<td>9</td>
<td>Sacristy</td>
<td>Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</td>
<td>Craft</td>
</tr>
<tr>
<td>9</td>
<td>Scriptorium</td>
<td>None*</td>
<td>Craft</td>
</tr>
<tr>
<td>9</td>
<td>Stable</td>
<td>None</td>
<td>Trade</td>
</tr>
<tr>
<td>9</td>
<td>Teleportation Circle</td>
<td>None</td>
<td>Recruit</td>
</tr>
<tr>
<td>9</td>
<td>Theatre</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>9</td>
<td>Training Area</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>9</td>
<td>Trophy Room</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>13</td>
<td>Archive</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>13</td>
<td>Meditation Chamber</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Menagerie</td>
<td>None</td>
<td>Recruit</td>
</tr>
<tr>
<td>13</td>
<td>Observatory</td>
<td>Ability to use a Spellcasting Focus</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Pub</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>13</td>
<td>Reliquary</td>
<td>Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</td>
<td>Harvest</td>
</tr>
<tr>
<td>17</td>
<td>Demiplane</td>
<td>Ability to use an Arcane Focus or a tool as a Spellcasting Focus</td>
<td>Empower</td>
</tr>
<tr>
<td>17</td>
<td>Guildhall</td>
<td>Expertise in a skill</td>
<td>Recruit</td>
</tr>
<tr>
<td>17</td>
<td>Sanctum</td>
<td>Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</td>
<td>Empower</td>
</tr>
<tr>
<td>17</td>
<td>War Room</td>
<td>Fighting Style feature or Unarmored Defense feature</td>
<td>Recruit</td>
</tr>
</tbody></table>
<p>*Certain orders that can be issued to these facilities have additional prerequisites.</p>
<h3>Arcane Study </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use an Arcane Focus or tool as a Spellcasting Focus<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Craft</p>
<p>An Arcane Study is a place of quiet research that contains one or more desks and bookshelves.</p>
<p><strong>Arcane Study Charm.</strong> After spending a Long Rest in your Bastion, you gain a magical Charm (see “Supernatural Gifts”) that lasts for 7 days or until you use it. The Charm allows you to cast Identify without expending a spell slot or using Material components. You can’t gain this Charm again while you still have it.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft:</strong> Arcane Focus. You commission the facility’s hireling to craft an Arcane Focus. The work takes 7 days and costs no money. The Arcane Focus remains in your Bastion until you claim it.</p>
<p><strong>Craft: Book.</strong> You commission the facility’s hireling to craft a blank book. The work takes 7 days and costs you 10 GP. The book remains in your Bastion until you claim it.</p>
<p><strong>Craft: Magic Item (Arcana).</strong> If you are level 9+, you can commission the facility’s hireling to craft a Common or an Uncommon magic item chosen by you from the Arcana tables in chapter 7. The facility has the tool required to craft the item, and the hireling has proficiency with that tool as well as proficiency in the Arcana skill. See the “Crafting Magic Items” section in chapter 7 for the time and money that must be spent to craft the item. If the item allows its user to cast any spells from it, you must craft the item yourself (the facility’s hireling can assist), and you must have all those spells prepared every day you spend crafting the item.</p>
<h3>Archive </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Research</p>
<p>An Archive is a repository of valuable books, maps, and scrolls. It is usually attached to a Library behind a locked or secret door.</p>
<p><strong>Research: Helpful Lore.</strong> When you issue the Research order to this facility, you commission the facility’s hireling to search the Archive for helpful lore. The work takes 7 days. The hireling gains knowledge as if they had cast the Legend Lore spell, then shares this knowledge with you the next time you speak with them.</p>
<p><strong>Reference Book.</strong> Your Archive contains one copy of a rare and valuable reference book, which gives you a benefit while you and the book are in your Bastion. You can choose one of the following options (your DM might make more options available):</p>
<p><strong>Bigby’s Handy Arcana Codex.</strong> You have Advantage on any Intelligence (Arcana) check you make when you take the Study action to recall lore about spells, magic items, eldritch symbols, magical traditions, and planes of existence.</p>
<p><strong>The Chronepsis Chronicles.</strong> You have Advantage on any Intelligence (History) check you make when you take the Study action to recall lore about historical events, legendary people, ancient kingdoms, past disputes, wars, and lost civilizations.</p>
<p><strong>Investigations of the Inquisitive.</strong> You have Advantage on any Intelligence (Investigation) check you make when you take the Study action to make deductions based on clues or evidence or to recall lore about traps, ciphers, riddles, and gadgetry.</p>
<p><strong>Material Musings on the Nature of the World.</strong> You have Advantage on any Intelligence (Nature) check you make when you take the Study action to recall lore about terrain, plants, animals, and the weather.</p>
<p><strong>The Old Faith and Other Religions.</strong> You have Advantage on any Intelligence (Religion) check you make when you take the Study action to recall lore about deities, rites and prayers, hierarchies, holy symbols, and the practices of secret cults.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Archive to a Vast facility by spending 2,000 GP. If you do so, you gain two additional reference books chosen from the list above.</p>
<h3>Armory </h3>
<p>Level 5 Bastion Facility</p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Trade</p>
<p>An Armory contains mannequins for displaying armor, hooks for holding Shields, racks for storing weapons, and chests for holding ammunition.</p>
<p><strong>Trade: Stock Armory.</strong> When you issue the Trade order to this facility, you commission the facility’s hireling to stock the Armory with armor, Shields, weapons, and ammunition. This equipment costs you 100 GP plus an extra 100 GP for each Bastion Defender in your Bastion. If your Bastion has a Smithy, the total cost is halved.</p>
<p>While your Armory is stocked, your Bastion Defenders are harder to kill. When any event causes you to roll dice to determine if your Bastion loses one or more of its defenders (see “Bastion Events” at the end of this chapter), roll 1d8 in place of each d6 you would normally roll. When the event is over, the equipment in your Armory is expended regardless of how many Bastion Defenders you have or how many you lost, leaving your Armory depleted until you issue another Trade order to the facility and pay the cost to restock it.</p>
<h3>Barrack </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Recruit</p>
<p>A Bastion can have more than one Barrack, each of which is furnished to serve as sleeping quarters for up to twelve Bastion Defenders.</p>
<p><strong>Recruit: Bastion Defenders.</strong> Each time you issue the Recruit order to this facility, up to four Bastion Defenders are recruited to your Bastion and assigned quarters in this Barrack. The recruitment costs no money. You can’t issue the Recruit order to this facility if it’s fully occupied.</p>
<p>Keep track of the Bastion Defenders housed in each of your Barracks. If you lose Bastion Defenders, deduct them from your roster. Assign names and personalities to your Bastion Defenders as you see fit.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Barrack to a Vast facility by spending 2,000 GP. A Vast Barrack can accommodate up to twenty-five Bastion Defenders.</p>
<h3>Demiplane </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use an Arcane Focus or a tool as a Spellcasting Focus<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Empower</p>
<p>A door up to 5 feet wide and 10 feet tall appears on a flat, solid surface in one of the other facilities in your Bastion. You choose the location. If you are in your Bastion during a Bastion turn, you can relocate this door to another facility in your Bastion.</p>
<p>Only you and your Bastion’s hirelings can open the door, which leads to a Demiplane that takes the form of a stone room. The Demiplane exists in an extradimensional space and therefore isn’t attached physically to other locations in your Bastion. Neither the Demiplane nor its door can be dispelled.</p>
<p><strong>Empower: Arcane Resilience.</strong> When you issue the Empower order to this facility, magical runes appear on the Demiplane’s walls and last for 7 days. Until the runes disappear, you gain Temporary Hit Points equal to five times your level after spending an entire Long Rest in the Demiplane.</p>
<p><strong>Fabrication.</strong> While in the Demiplane, you can take a Magic action to create a nonmagical object of your choice from nothing, causing it to appear in an unoccupied space in the Demiplane. The object can be no bigger than 5 feet in any dimension; can’t have a value over 5 GP; and must be made of wood, stone, clay, porcelain, glass, paper, nonprecious crystal, or nonprecious metal. You must finish a Long Rest before you can take this action again.</p>
<h3>Gaming Hall </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 4<br/>
<strong>Order:</strong> Trade</p>
<p>A Gaming Hall offers recreational activities like chess and games of darts, cards, or dice.</p>
<p><strong>Trade: Gambling Hall.</strong> When you issue the Trade order to this facility, the facility’s hirelings turn the Gaming Hall into a gambling den for 7 days. At the end of the seventh day, roll 1d100 and consult the following table to determine your portion of the house’s winnings.</p>
<table>
<tbody>
<tr>
<th>1d100</th>
<th>Winnings</th>
</tr>
<tr>
<td>01-50</td>
<td>1d6 x 10 GP</td>
</tr>
<tr>
<td>51-85</td>
<td>2d6 x 10 GP</td>
</tr>
<tr>
<td>86-95</td>
<td>4d6 x 10 GP</td>
</tr>
<tr>
<td>96-00</td>
<td>10d6 x 10 GP</td>
</tr>
</tbody></table>
<h3>Garden </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Harvest</p>
<p>A Bastion can have more than one Garden. Each time you add a Garden to your Bastion, choose its type from the options in the Garden Types table.</p>
<p>While in your Bastion, you can instruct the facility’s hireling to change the Garden from one type to another. This work takes 21 days, during which time no other activity can occur in this facility.</p>
<p><strong>Harvest: Garden Growth.</strong> When you issue the Harvest order to this facility, you commission the facility’s hireling to collect items from the Garden as noted in the Garden Types table. The work takes 7 days and costs no money.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Garden to a Vast facility by spending 2,000 GP. A Vast Garden is equivalent to two Roomy Gardens and can include two of the same type of Garden or two different types. When you issue the Harvest order to a Vast Garden, each component garden produces its own harvest. A Vast Garden gains one additional hireling.</p>
<table>
<tbody>
<tr>
<th>Garden Type</th>
<th>Description</th>
<th>Harvest</th>
</tr>
<tr>
<td>Decorative</td>
<td>Aesthetically pleasing garden full of flowers and topiaries.</td>
<td>Ten exquisite floral bouquets (worth 5 GP each), ten vials of Perfume, or ten Candles</td>
</tr>
<tr>
<td>Food</td>
<td>Garden of delicious mushrooms or vegetables</td>
<td>100 days worth of Rations</td>
</tr>
<tr>
<td>Herb</td>
<td>Garden of rare herbs, some of which have medicinal uses</td>
<td>Herbs that are used to create either ten Healer’s Kits or one Potion of Healing</td>
</tr>
<tr>
<td>Poison</td>
<td>Garden stocked with plants and fungi from which poisons and antitoxin can be extracted</td>
<td>Plants that are used to create either two vials of Antitoxin or one vial of Basic Poison</td>
</tr>
</tbody></table>
<h3>Greenhouse </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Harvest</p>
<p>A Greenhouse is an enclosure where rare plants and fungi are nurtured in a controlled climate.</p>
<p><strong>Fruit of Restoration.</strong> One plant in your Greenhouse has three magical fruits growing on it. Any creature that eats one of these fruits gains the benefit of a Lesser Restoration spell. Fruits that aren’t eaten within 24 hours of being picked lose their magic. The plant replaces all picked fruits daily at dawn, and it can’t be transplanted without killing it.</p>
<p><strong>Harvest Options.</strong> When you issue the Harvest order to this facility, choose one of the following options:</p>
<p><strong>Harvest: Healing Herbs.</strong> You commission the facility’s hireling to create a Potion of Healing (greater) made from healing herbs. The work takes 7 days and costs no money.</p>
<p><strong>Harvest:</strong> Poison. You commission the facility’s hireling to extract one application of a poison from rare plants or fungi. Choose the type of poison from the following options: Assassin’s Blood, Malice, Pale Tincture, or Truth Serum. See “Poison” in chapter 3 for each poison’s effect. Once harvested, the poison can be contained in a vial. The work takes 7 days and costs no money.</p>
<h3>Guildhall </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Expertise in a skill<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Recruit</p>
<p>A Guildhall comes with a guild, for which you are the guild master. Choose the type of guild from the options in the Sample Guilds table, or work with your DM to create a new guild. The facility is a meeting room where members of your guild can discuss important matters in your presence.</p>
<p>Your guild has roughly fifty members made up of skilled folk who live and work outside your Bastion, usually in nearby settlements.</p>
<p><strong>Recruit: Guild Assignment.</strong> Each time you issue the Recruit order to this facility, you commission the facility’s hireling to recruit guild members to perform a special assignment. Each guild in the Sample Guilds table specifies the nature of that assignment. With your DM’s permission and help, you can create new assignments for guild members to complete.</p>
<strong>Sample Guilds</strong><br/>
<table>
<tbody>
<tr>
<th>Guild</th>
<th>Symbol</th>
<th>Assignment</th>
</tr>
<tr>
<td>Adventurers’ Guild</td>
<td>Lit torch</td>
<td>You send adventurers to track down a Beast that has a Challenge Rating of 2 or lower and is known to lair within 50 miles of your Bastion. The adventurers slay or capture the creature (your choice) in 1d6 + 1 days. If the creature is slain and your Bastion has a Trophy Room, you can add a trophy taken from the creature to that facility. If the creature is captured and your Bastion has a Menagerie, you can add the creature to that facility, provided the facility has space to house it.</td>
</tr>
<tr>
<td>Bakers’ Guild</td>
<td>Pastry</td>
<td>You assign bakers to create baked goods for a prestigious event that occurs within the next 7 days. You can receive payment in coin (500 GP) or in the form of a favor owed to you by the event’s host, the details of which are left to you and the DM.</td>
</tr>
<tr>
<td>Brewers’ Guild</td>
<td>Foaming mug</td>
<td>You assign brewers to deliver fifty 40-gallon barrels of ale (worth 10 GP each) to your Bastion in 7 days.</td>
</tr>
<tr>
<td>Masons’ Guild</td>
<td>Stone mask</td>
<td>You assign masons to add a defensive wall to your Bastion at no cost. Alternatively, you can have the masons perform this work for another character’s Bastion, provided their Bastion is within 1 mile of yours. Each 5-foot square of defensive wall takes 1 day to build instead of 10 (see “Bastion Map”).</td>
</tr>
<tr>
<td>Shipbuilders’ Guild</td>
<td>Crossed oars</td>
<td>You assign shipbuilders to build one of the vehicles in the Airborne and Waterborne Vehicles table of the Player’s Handbook. You pay the full cost of the vehicle, and the work takes 1 day per 1,000 GP of the vehicle’s cost (a Rowboat can be made in 1 day).</td>
</tr>
<tr>
<td>Thieves’ Guild</td>
<td>White key</td>
<td>You assign thieves to infiltrate a location within 50 miles of your Bastion and steal a nonmagical object from it. The object can be no bigger than 5 feet in any dimension and is delivered to your Bastion in 1d6 + 1 days. The DM may decide this activity leaves you at risk of retaliation from law enforcement or the victim.</td>
</tr>
</tbody></table>
<h3>Laboratory </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Craft</p>
<p>A Laboratory contains storage space for alchemical supplies and workspaces for crafting various concoctions.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Alchemist’s Supplies.</strong> The facility’s hireling crafts anything that can be made with Alchemist’s Supplies using the rules in the Player’s Handbook and chapter 7 of this book.</p>
<p><strong>Craft: Poison.</strong> You commission the facility’s hireling to craft a vial containing one application of a poison. The poison must be one of the following: Burnt Othur Fumes, Essence of Ether, or Torpor. This work takes 7 days, and you must pay half the poison’s cost. See “Poison” in chapter 3 for descriptions and costs of poisons.</p>
<h3>Library </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Research</p>
<p>This Library contains a collection of books plus one or more desks and reading chairs.</p>
<p><strong>Research: Topical Lore.</strong> When you issue the Research order to this facility, you commission the facility’s hireling to research a topic. The topic can be a legend, a known event or location, a person of significance, a type of creature, or a famous object. The work takes 7 days. When the research concludes, the hireling obtains up to three accurate pieces of information about the topic that were previously unknown to you and shares this knowledge with you the next time you speak with them. The DM determines what information you learn.</p>
<h3>Meditation Chamber </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Cramped<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Empower</p>
<p>A Meditation Chamber is a relaxing space that helps align one’s mind, body, and spirit.</p>
<p><strong>Empower: Inner Peace.</strong> When you issue the Empower order to this facility, your Bastion’s hirelings can use the Meditation Chamber to gain a measure of inner peace. The next time you roll for a Bastion event, you can roll twice and choose either result.</p>
<p><strong>Fortify Self.</strong> You can meditate in this facility over a period of 7 days. If you leave the Bastion during this time, you gain no benefit. Otherwise, at the end of the seventh day, you gain Advantage on two kinds of saving throws for the next 7 days, determined randomly by rolling on the table below. Reroll if you get a duplicate result.</p>
<table>
<tbody>
<tr>
<th>1d6</th>
<th>Saving Throw</th>
</tr>
<tr>
<td>1</td>
<td>Strength</td>
</tr>
<tr>
<td>2</td>
<td>Dexterity</td>
</tr>
<tr>
<td>3</td>
<td>Constitution</td>
</tr>
<tr>
<td>4</td>
<td>Intelligence</td>
</tr>
<tr>
<td>5</td>
<td>Wisdom</td>
</tr>
<tr>
<td>6</td>
<td>Charisma</td>
</tr>
</tbody></table>
<h3>Menagerie </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Vast<br/>
Hirelings: 2<br/>
<strong>Order:</strong> Recruit</p>
<p>A Menagerie has enclosures big enough to contain up to four Large creatures. Four Small or Medium creatures can occupy the same space as one Large creature there.</p>
<p><strong>Recruit: Creature.</strong> When you issue the Recruit order to this facility, you commission the facility’s hirelings to add a creature from the Menagerie Creatures table to your Menagerie. The recruitment takes 7 days and costs you the amount listed in the table. The hirelings look after the creature.</p>
<p>Creatures in your Menagerie count as Bastion Defenders. Deduct any you lose from your Bastion Defenders roster. You can choose not to count one or more of these creatures as Bastion Defenders, in which case they can’t be called on to defend the Bastion. Instead, they act in accordance with their nature and use their stat blocks in the Monster Manual.</p>
<strong>Menagerie Creatures</strong><br/>
<table>
<tbody>
<tr>
<th>Creature</th>
<th>Size</th>
<th>Cost</th>
</tr>
<tr>
<td>Ape</td>
<td>Medium</td>
<td>500 GP</td>
</tr>
<tr>
<td>Black Bear</td>
<td>Medium</td>
<td>500 GP</td>
</tr>
<tr>
<td>Brown Bear</td>
<td>Large</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Constrictor Snake</td>
<td>Large</td>
<td>250 GP</td>
</tr>
<tr>
<td>Crocodile</td>
<td>Large</td>
<td>500 GP</td>
</tr>
<tr>
<td>Dire Wolf</td>
<td>Large</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Giant Vulture</td>
<td>Large</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Hyena</td>
<td>Medium</td>
<td>50 GP</td>
</tr>
<tr>
<td>Jackal</td>
<td>Small</td>
<td>50 GP</td>
</tr>
<tr>
<td>Lion</td>
<td>Large</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Owlbear</td>
<td>Large</td>
<td>3,500 GP</td>
</tr>
<tr>
<td>Panther</td>
<td>Medium</td>
<td>250 GP</td>
</tr>
<tr>
<td>Tiger</td>
<td>Large</td>
<td>1,000 GP</td>
</tr>
</tbody></table>
<p>With the DM’s consent, you can add different creatures than those shown in the Menagerie Creatures table to your Menagerie. The cost of a creature depends on its Challenge Rating, as shown on the Creature Costs by Challenge Rating table. Typically only Beasts and some Monstrosities can be kept in a Menagerie, though the DM might allow other creatures.</p>
<table>
<tbody>
<tr>
<th>Challenge Rating</th>
<th>Cost</th>
</tr>
<tr>
<td>0 or 1/8</td>
<td>50 GP</td>
</tr>
<tr>
<td>1/4</td>
<td>250 GP</td>
</tr>
<tr>
<td>1/2</td>
<td>500 GP</td>
</tr>
<tr>
<td>1</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>2</td>
<td>2,000 GP</td>
</tr>
<tr>
<td>3</td>
<td>3,500 GP</td>
</tr>
</tbody></table>
<h3>Observatory </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Spellcasting Focus<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Empower</p>
<p>Situated atop your Bastion, your Observatory contains a telescope aimed at the night sky.</p>
<p><strong>Observatory Charm.</strong> You can use your Observatory to peer into the far corners of Wildspace and the Astral Plane. After spending a Long Rest in your Observatory, you gain a magical Charm (see “Supernatural Gifts” in chapter 3) that lasts for 7 days or until you use it. The Charm allows you to cast Contact Other Plane without expending a spell slot. You can’t gain this Charm again while you still have it.</p>
<p><strong>Empower: Eldritch Discovery.</strong> When you issue the Empower order to this facility, you enable yourself or the facility’s hireling to explore the eldritch mysteries of the stars for 7 consecutive nights. At the end of that time, roll a die. If the number rolled is even, nothing is gained. If the number rolled is odd, an unknown power bestows one of the following Charms on you or another creature of your choice that is on the same plane of existence as you: Charm of Darkvision, Charm of Heroism, or Charm of Vitality (all described in chapter 3).</p>
<h3>Pub </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Research</p>
<p>Folks come here to consume tasty beverages and socialize. Your Pub might be a bar, coffee shop, or tea room, and it might have a colorful name, such as the Rusty Flagon or the Dragon’s Loft. The facility’s hireling, who serves as the bartender, maintains a network of spies scattered throughout nearby communities. These spies are useful sources of information and frequent the Pub, often incognito.</p>
<p><strong>Research: Information Gathering.</strong> When you issue the Research order to this facility, you commission the Pub’s bartender to gather information from spies who are aware of all important events happening within 10 miles of your Bastion over the next 7 days. During that time, these spies can divulge the location of any creature that is familiar to you, provided the creature is within 50 miles of your Bastion and not hidden by magic or confined to a location that the DM deems is beyond the spy network’s ability to locate. If the spies learn the target’s location, they also learn where that creature has been for the previous 7 days.</p>
<p><strong>Pub Special.</strong> The Pub has one magical beverage on tap, chosen from the options below:</p>
<p><strong>Bigby’s Burden.</strong> Drinking a pint of this beverage grants you the “enlarge” effect of an Enlarge/Reduce spell that has a duration of 24 hours (no saving throw allowed).</p>
<p><strong>Kiss of the Spider Queen.</strong> Drinking a pint of this beverage grants you the effect of a Spider Climb spell that has a duration of 24 hours.</p>
<p><strong>Moonlight Serenade.</strong> Drinking a pint of this beverage gives you Darkvision out to 60 feet for 24 hours. If you already have Darkvision, its range is extended by 60 feet for the same duration.</p>
<p><strong>Positive Reinforcement.</strong> Drinking a pint of this beverage gives you Resistance to Necrotic damage for 24 hours.</p>
<p><strong>Sterner Stuff.</strong> For 24 hours after drinking a pint of this beverage, you automatically succeed on saving throws to avoid or end the Frightened condition.</p>
<p>At the start of a Bastion turn, you can switch to one of the other options. Your DM may create new options. A pint of this magical beverage loses its magic 24 hours after it’s poured.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Pub to a Vast facility by spending 2,000 GP. If you do so, the Pub can have two magical beverages from the Pub Special list on tap at a time. A Vast Pub gains three additional hirelings, for a total of four. These new hirelings are servers. Assign names and personalities to them as you see fit.</p>
<h3>Reliquary </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus<br/>
<strong>Space:</strong> Cramped<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Harvest</p>
<p>This vault holds sacred objects.</p>
<p><strong>Reliquary Charm.</strong> After spending a Long Rest in your Bastion, you gain a magical Charm (see “Supernatural Gifts”) that lasts for 7 days or until you use it. The Charm allows you to cast Greater Restoration once without expending a spell slot or using Material components. You can’t gain this Charm again while you still have it.</p>
<p><strong>Harvest: Talisman.</strong> When you issue the Harvest order to this facility, you commission its hireling to produce a specially prepared talisman for your use. The talisman usually takes the form of an amulet, a rune-carved box, or a statuette, but it can be any Tiny, nonmagical object that has religious significance. The work takes 7 days and costs no money. You can use this talisman in place of one spell’s Material components, provided the components have a cost of 1,000 GP or less. If the spell normally consumes its components, the talisman isn’t consumed. After the talisman has been used in this way, it can’t be used again until you return it to your Reliquary and use another Harvest order to prepare it.</p>
<h3>Sacristy </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Craft</p>
<p>A Sacristy serves as a preparation and storage room for the sacred items and religious vestments.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Holy Water.</strong> You commission the facility’s hireling to craft a flask of Holy Water. The work takes 7 days and costs no money. You can spend GP during the creation process to increase the potency of the Holy Water. For every 100 GP you spend, up to a maximum of 500 GP, the damage dealt by the Holy Water increases by 1d8.</p>
<p><strong>Craft: Magic Item (Relic).</strong> You commission the facility’s hireling to craft a Common or an Uncommon magic item chosen by you from the Relics tables in chapter 7. The facility has the tool required to craft the item, and the hireling has proficiency with that tool as well as proficiency in the Arcana skill. See the “Crafting Magic Items” section in chapter 7 for the time and money that must be spent to craft the item. If the item allows its user to cast any spells from it, you must craft the item yourself (the facility’s hireling can assist), and you must have all those spells prepared every day you spend crafting the item.</p>
<p><strong>Spell Refreshment.</strong> Having a Sacristy allows you to regain one expended spell slot of level 5 or lower after spending an entire Short Rest in your Bastion. You can’t gain this benefit again until you finish a Long Rest.</p>
<h3>Sanctuary </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Craft</p>
<p>Icons of your religion are displayed in this facility, which includes a quiet place for worship.</p>
<p><strong>Sanctuary Charm.</strong> After spending a Long Rest in your Bastion, you gain a magical Charm (see “Supernatural Gifts” in chapter 3) that lasts for 7 days or until you use it. The Charm allows you to cast Healing Word once without expending a spell slot. You can’t gain this Charm again while you still have it.</p>
<p><strong>Craft: Sacred Focus.</strong> When you issue the Craft order to this facility, you commission the facility’s hireling to craft a Druidic Focus (wooden staff) or a Holy Symbol. The work takes 7 days and costs no money. The item remains in your Bastion until you claim it.</p>
<h3>Sanctum </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 4<br/>
<strong>Order:</strong> Empower</p>
<p>A Sanctum is a place of solace and healing.</p>
<p><strong>Sanctum Charm.</strong> After spending a Long Rest in your Bastion, you gain a magical Charm (see “Supernatural Gifts” in chapter 3) that lasts for 7 days or until you use it. The Charm allows you to cast Heal once without expending a spell slot. You can’t gain this Charm again while you still have it.</p>
<p><strong>Empower: Fortifying Rites.</strong> When you issue the Empower order to this facility, you inspire its hirelings to perform daily rites that benefit you or another character you name. The beneficiary doesn’t need to be in the Bastion when the rites are performed to gain their benefit. Each time the beneficiary finishes a Long Rest, they gain Temporary Hit Points equal to your level. This effect lasts for 7 days.</p>
<p><strong>Sanctum Recall.</strong> While the Sanctum exists, you always have the Word of Recall spell prepared. When you cast Word of Recall, you can make your Sanctum the destination of the spell instead of another place you have previously designated. In addition, one creature of your choice that arrives in the Sanctum via this spell gains the benefit of a Heal spell.</p>
<h3>Scriptorium </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
Order: Craft</p>
<p>A Scriptorium contains desks and writing supplies.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Book Replica.</strong> You commission the facility’s hireling to make a copy of a nonmagical Book. Doing so requires a blank book. The work takes 7 days.</p>
<p><strong>Craft: Spell Scroll.</strong> You commission the facility’s hireling to scribe a Spell Scroll containing one Cleric or Wizard spell of level 3 or lower. The facility has the necessary Calligrapher’s Supplies, and the hireling meets all the prerequisites needed to scribe the scroll. The “Crafting Equipment” section in the Player’s Handbook specifies the time needed to scribe the scroll and the cost of the scroll, which you must pay.</p>
<p><strong>Craft: Paperwork.</strong> You commission the facility’s hireling to create up to fifty copies of a broadsheet, a pamphlet, or another loose-leaf paper product. The work takes 7 days and costs you 1 GP per copy. At no additional cost in time or money, the facility’s hireling can distribute the paperwork to one or more locations within 50 miles of your Bastion.</p>
<h3>Smithy </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 2<br/>
<strong>Order:</strong> Craft</p>
<p>This Smithy contains a forge, an anvil, and other tools needed to craft weapons, armor, and other equipment.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Smith’s Tools.</strong> The facility’s hirelings craft anything that can be made with Smith’s Tools, using the rules in the Player’s Handbook.</p>
<p><strong>Craft: Magic Item (Armament).</strong> If you are level 9+, can you commission the facility’s hirelings to craft a Common or an Uncommon magic item chosen by you from the Armaments tables in chapter 7. The facility has the tool required to craft the item, and the hirelings have proficiency with that tool as well as proficiency in the Arcana skill. See the “Crafting Magic Items” section in chapter 7 for the time and money that must be spent to craft the item. If the item allows its user to cast any spells from it, you must craft the item yourself (the facility’s hirelings can assist), and you must have all those spells prepared every day you spend crafting the item.</p>
<h3>Stable </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Trade</p>
<p>A Bastion can have more than one Stable. Each Stable you add to your Bastion comes with one Riding Horse or Camel and two Ponies or Mules; see the Player’s Handbook or the Monster Manual for these creatures’ stat blocks. The facility is big enough to house three Large animals. Two Medium creatures occupy the same amount of space as one Large creature there. The facility’s hireling looks after these creatures.</p>
<p>After a Beast that can serve as a mount spends at least 14 days in this facility, all Wisdom (Animal Handling) checks made with respect to it have Advantage.</p>
<p><strong>Trade: Animals.</strong> When you issue the Trade order to this facility, you commission the facility’s hireling to buy or sell one or more mounts at normal cost, keeping the ones you buy in your Stable. The work takes 7 days, and the DM decides what types of animals are available for purchase—horses, ponies, and mules being the most common. The Mounts and Other Animals table in the Player’s Handbook gives standard prices for various mounts. You bear the total cost of any purchases.</p>
<p>When you sell a mount from your Stable, the buyer pays you 20 percent more than the standard price; this profit increases to 50 percent when you reach level 13 and 100 percent when you reach level 17.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Stable to a Vast facility by spending 2,000 GP. If you do so, the Stable is large enough to house six Large animals.</p>
<h3>Storehouse </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Trade</p>
<p>A Storehouse is a cool, dark space meant to contain trade goods objects from the Trade Goods table in chapter 7 and from chapter 6 of the Player's Handbook.</p>
<p><strong>Trade: Goods.</strong> When you issue the Trade order to this facility, its hireling spends the next 7 days procuring nonmagical items that have a total value of 500 GP or less and stores them in the Storehouse, or the hireling uses those 7 days to sell goods in the Storehouse. You bear the total cost of any purchases, and the maximum value of the items purchased increases to 2,000 GP when you reach level 9 and 5,000 GP when you reach level 13.</p>
<p>When you sell goods from your Storehouse, the buyer pays you 10 percent more than the standard price; this profit increases to 20 percent when you reach level 9, 50 percent when you reach level 13, and 100 percent when you reach level 17.</p>
<h3>Teleportation Circle </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Recruit</p>
<p>Inscribed on the floor of this room is a permanent teleportation circle created by the Teleportation Circle spell.</p>
<p><strong>Recruit: Spellcaster.</strong> Each time you issue the Recruit order to this facility, its hireling extends an invitation to a Friendly NPC spellcaster. Roll any die. If the number rolled is odd, the invitee declines the invitation, and you gain no benefit from having issued the order. If the number rolled is even, the invitee accepts the invitation and arrives in your Bastion via your Teleportation Circle.</p>
<p>While you are in your Bastion, you can ask the spellcaster to cast one Wizard spell of level 4 or lower; if you are level 17+, the spell’s maximum level increases to 8. The spellcaster is assumed to have the spell prepared. If the spell has one or more Material components that cost money, you must pay for them before the spell can be cast.</p>
<p>The spellcaster stays for 14 days or until they cast a spell for you. The spellcaster won’t defend your Bastion and departs immediately if the Bastion is attacked (see “Bastion Events” at the end of the chapter).</p>
<h3>Theater </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 4<br/>
<strong>Order:</strong> Empower</p>
<p>The Theater contains a stage, a backstage area where props and sets are kept, and a seating area for a small audience.</p>
<p><strong>Empower: Theatrical Event.</strong> When you issue the Empower order to this facility, its hirelings begin work on a theatrical production or concert. Rehearsals and other preparations take 14 days, followed by at least 7 days of performances. The performances can continue indefinitely until a new production gets underway.</p>
<p>You or another character can contribute to a production in the following ways:</p>
<p><strong>Composer/Writer.</strong> A character can compose music or write a script for a concert or production that hasn’t started rehearsals yet. This effort takes 14 days.</p>
<p><strong>Conductor/Director.</strong> A character who remains in the Bastion for the entirety of the production can serve as the concert’s conductor or the production’s director.</p>
<p><strong>Performer.</strong> A character who remains in the Bastion for the entirety of the rehearsal period can be a star performer in one or more of the performances; one of the Theater’s hirelings can serve as an understudy for additional performances.</p>
<p>At the end of a rehearsal period, each character who contributed to the concert or production can make a DC 15 Charisma (Performance) check. If more of these checks succeed than fail, you and any other character who contributed to the concert or production each gain a Theater die, a d6. This die changes to a d8 when you reach level 13 and a d10 when you reach level 17. At any point after the rehearsals end, a character can expend their Theater die to roll it and add the number rolled to one D20 Test they make, immediately after rolling the d20. If a character hasn’t expended their Theater die before gaining another, their first die is lost.</p>
<h3>Training Area </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 4<br/>
<strong>Order:</strong> Empower</p>
<p>A Bastion can have more than one Training Area. A Training Area might be an open courtyard, a gymnasium, a music or dance hall, or a cleverly built gauntlet of traps and hazards. It might contain inanimate targets (for weapon practice), padded mats, and other equipment. One of the facility’s hirelings is an expert trainer; the others serve as training partners.</p>
<p>When a Training Area becomes part of your Bastion, choose one trainer from the Expert Trainers table. On each Bastion turn, you can replace that trainer with another one from the table.</p>
<table>
<tbody>
<tr>
<th>Trainer Type</th>
<th>Empower Effect</th>
</tr>
<tr>
<td>Battle Expert</td>
<td>When you take damage from an attack made with an Unarmed Strike or a weapon, you can take a Reaction to reduce this damage by 1d4.</td>
</tr>
<tr>
<td>Skills Expert</td>
<td>You gain proficiency in one of the following skills of your choice: Acrobatics, Athletics, Performance, Sleight of Hand, or Stealth.</td>
</tr>
<tr>
<td>Tools Expert</td>
<td>You gain proficiency with one tool of your choice.</td>
</tr>
<tr>
<td>Unarmed Combat Expert</td>
<td>When you hit with your Unarmed Strike and deal damage, the attack deals an extra 1d4 Bludgeoning damage.</td>
</tr>
<tr>
<td>Weapon Expert</td>
<td>Choose a kind of Simple or Martial weapon, such as Spear or Longbow. If you aren’t proficient with the weapon, you gain proficiency with it. If you already have proficiency with the weapon, you can use its mastery property.</td>
</tr>
</tbody></table>
<p><strong>Empower: Training.</strong> When you issue the Empower order to this facility, the facility’s hirelings conduct training exercises for the next 7 days. Any character who trains here for at least 8 hours on each of those days gains a benefit at the end of the training period. The benefit depends on which trainer is present in the facility, as noted in the Expert Trainers table. The benefit lasts for 7 days.</p>
<h3>Trophy Room </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 1<br/>
<strong>Order:</strong> Research</p>
<p>This room houses a collection of mementos, such as weapons from old battles, the mounted heads of slain creatures, trinkets plucked from dungeons and ruins, and trophies passed down from ancestors.</p>
<p><strong>Research Options.</strong> When you issue the Research order to this facility, choose one of the following options:</p>
<p><strong>Research: Lore.</strong> You commission the facility’s hireling to research a topic of your choice. The topic can be a legend, any kind of creature, or a famous object. The topic need not be directly related to items on display in the room, as the trophies provide clues to research a wide variety of other subjects. The work takes 7 days. When the research concludes, the hireling obtains up to three accurate pieces of information about the topic that were previously unknown to you and shares this knowledge with you the next time you speak with them. The DM determines what information is learned.</p>
<p><strong>Research: Trinket Trophy.</strong> You commission the facility’s hireling to search for a trinket that might be of use to you. The work takes 7 days. When the research concludes, roll any die. If the number rolled is odd, the hireling finds nothing useful. If the number rolled is even, the hireling finds a magic item. Roll on the Implements - Common table in chapter 7 to determine what it is.</p>
<h3>War Room </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Fighting Style feature or Unarmored Defense feature<br/>
<strong>Space:</strong> Vast<br/>
<strong>Hirelings:</strong> 2+ (see below)<br/>
<strong>Order:</strong> Recruit</p>
<p>The War Room is where you plan military actions in consultation with an inner circle of loyal lieutenants, each one a battle-hardened Veteran Warrior (see the Monster Manual) whose alignment matches yours. You start with two lieutenants but can add more, as described below. If your Bastion lacks facilities to house your lieutenants, they secure accommodations in the inn or settlement closest to your Bastion. Lieutenants are hirelings, not Bastion Defenders; however, if your Bastion is attacked (see “Bastion Events” at the end of this chapter), each lieutenant housed in your Bastion reduces by 1 the number of dice you roll to determine how many Bastion Defenders are lost in the attack.</p>
<p>The War Room contains war memorabilia plus a large table surrounded by enough chairs for you and your lieutenants.</p>
<p><strong>Recruit Options.</strong> When you issue the Recruit order to this facility, choose one of the following options:</p>
<p><strong>Recruit: Lieutenant.</strong> You gain one new lieutenant. You can have up to ten lieutenants at any time. Assign names and personalities to them as you see fit.</p>
<p><strong>Recruit: Soldiers.</strong> You commission one or more of your lieutenants to assemble a small army. Each lieutenant can muster one hundred Guards (see the Monster Manual) in 7 days to fight for your cause. Reduce that number to twenty if you want them to be mounted on Riding Horses (see the Monster Manual). It costs you 1 GP per day to feed each guard and each horse in your army. Wherever the army goes, it must be led by you or at least one of your lieutenants, or else it disbands immediately. The army also disbands if it goes 1 day without being fed. Otherwise, the army remains until it is destroyed or you command it to disband. You can’t issue this Recruit order again until your current army disbands or is destroyed.</p>
<h3>Workshop </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None<br/>
<strong>Space:</strong> Roomy<br/>
<strong>Hirelings:</strong> 3<br/>
<strong>Order:</strong> Craft</p>
<p>This Workshop is a creative space where useful items can be crafted.</p>
<p><strong>Artisan’s Tools.</strong> The Workshop comes equipped with six different kinds of Artisan’s Tools, chosen from the following list:</p>
<p>Carpenter’s Tools</p>
<p>Cobbler’s Tools</p>
<p>Glassblower’s Tools</p>
<p>Jeweler’s Tools</p>
<p>Leatherworker’s Tools</p>
<p>Mason’s Tools</p>
<p>Painter’s Tools</p>
<p>Potter’s Tools</p>
<p>Tinker’s Tools</p>
<p>Weaver’s Tools</p>
<p>Woodcarver’s Tools</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Adventuring Gear.</strong> The facility’s hirelings craft anything that can be made with the tools you chose when you added the Workshop to your Bastion (see above), using the rules in the Player’s Handbook.</p>
<p><strong>Craft: Magic Item (Implement).</strong> If you are level 9+, you can commission the facility’s hirelings to craft a Common or an Uncommon magic item chosen by you from the Implements tables in chapter 7. The facility has the tool required to craft the item, and the hirelings have proficiency with that tool as well as proficiency in the Arcana skill. See the “Crafting Magic Items” section in chapter 7 for the time and money that must be spent to craft the item. If the item allows its user to cast any spells from it, you must craft the item yourself (the facility’s hirelings can assist), and you must have all those spells prepared every day you spend crafting the item.</p>
<p><strong>Source of Inspiration.</strong> After spending an entire Short Rest in your Workshop, you gain Heroic Inspiration. You can’t gain this benefit again until you finish a Long Rest.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Workshop to a Vast facility by spending 2,000 GP. If you do so, the Workshop gains two additional hirelings and three additional Artisan’s Tools (chosen from the list above).</p>
<h2>Forgotten Realms: Heroes of Faerun Facilities</h2>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facility</th>
<th>Prerequisite</th>
<th>Order</th>
</tr>
<tr>
<td>5</td>
<td>Amethyst Dragon Den</td>
<td>Membership in the Purple Dragon Knights</td>
<td>Empower</td>
</tr>
<tr>
<td>5</td>
<td>Harper Hideout</td>
<td>Membership in the Harpers</td>
<td>Empower</td>
</tr>
<tr>
<td>5</td>
<td>Red Wizard Necropolis</td>
<td>Membership in the Red Wizards, ability to use a Spellcasting Focus</td>
<td>Recruit</td>
</tr>
<tr>
<td>5</td>
<td>Zhentarim Travel Station</td>
<td>Membership in the Zhentarim</td>
<td>Research</td>
</tr>
<tr>
<td>9</td>
<td>Emerald Enclave Grove</td>
<td>Membership in the Emerald Enclave</td>
<td>Recruit</td>
</tr>
<tr>
<td>9</td>
<td>Lords' Alliance Noble Residence</td>
<td>Membership in the Lords’ Alliance</td>
<td>Recruit</td>
</tr>
<tr>
<td>9</td>
<td>Order of the Gauntlet Tournament Field</td>
<td>Membership in the Order of the Gauntlet</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Cult of the Dragon Archive</td>
<td>Membership in the Cult of the Dragon</td>
<td>Research</td>
</tr>
</tbody></table>
<h3>Amethyst Dragon Den </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Purple Dragon Knights</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>This den for an amethyst dragon is an enclosed open chamber with a pool, and one of its entrances is underwater. The facility’s hireling maintains the den and helps any visiting amethyst dragons feel comfortable.</p>
<p><strong>Empower: Psionic Defenses.</strong> When you issue the Empower order to this facility, latent draconic power fills the facility, allowing you to train in psionic combat. This training takes 8 hours per day for 7 days, after which you gain Resistance to Psychic damage. This benefit lasts for 7 days.</p>
<h3>Cult of the Dragon Archive </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Cult of the Dragon</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>A Cult of the Dragon Archive contains extensive records on specific topics, including dragons.</p>
<p><strong>Research: Helpful Lore.</strong> When you issue the Research order to this facility, you commission the facility’s hireling to search the archive for lore. The work takes 7 days. The hireling gains knowledge as if they had cast the Legend Lore spell, then shares this knowledge with you the next time you speak with them.</p>
<p><strong>Reference Books.</strong> Your Cult of the Dragon Archive contains a collection of draconic lore. You have Advantage on Intelligence (Nature or Religion) checks you make in your Bastion when you take the Study action to recall lore about Dragons, Tiamat, or the Cult of the Dragon.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Cult of the Dragon Archive to a Vast facility by spending 2,000 GP. If you do so, you gain two reference books chosen from those listed in the Archive entry in chapter 8 of the Dungeon Master’s Guide.</p>
<h3>Emerald Enclave Grove </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Emerald Enclave</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Recruit</p>
<p>Veteran agents of the Emerald Enclave create safe havens with trees, grass, and flowing water, where magical creatures that embody the power of nature live in peace and safety. The Emerald Enclave Grove can house one Huge creature or two Large creatures; four Small or Medium creatures or eight Tiny creatures can occupy the same space as one Large creature there.</p>
<p><strong>Recruit: Creature of Nature.</strong> When you issue the Recruit order to this facility, you invite a creature from the Emerald Enclave Grove Creatures table to your Emerald Enclave Grove. Roll any die. If the number rolled is odd, the creature doesn’t accept your invitation and you gain no benefit from having issued the order. If the number rolled is even, a creature accepts your invitation and moves into your Emerald Enclave Grove after 7 days. Your hirelings care for the creature and perform upkeep in the facility.</p>
<p>Creatures in your Emerald Enclave Grove count as Bastion Defenders. Deduct any you lose from your Bastion Defenders roster. You can choose not to count one or more of these creatures as Bastion Defenders, in which case they can’t be called on to defend the Bastion. Instead, they act in accordance with their nature and use their stat blocks in the Monster Manual.</p>
<strong>Emerald Enclave Grove Creatures</strong><br/>
<table>
<tbody>
<tr>
<th>Creature</th>
<th>Size</th>
</tr>
<tr>
<td>Awakened Shrub</td>
<td>Small</td>
</tr>
<tr>
<td>Awakened Tree</td>
<td>Huge</td>
</tr>
<tr>
<td>Blink Dog</td>
<td>Medium</td>
</tr>
<tr>
<td>Centaur Trooper</td>
<td>Large</td>
</tr>
<tr>
<td>Dryad</td>
<td>Medium</td>
</tr>
<tr>
<td>Myconid Adult</td>
<td>Medium</td>
</tr>
<tr>
<td>Myconid Sprout</td>
<td>Small</td>
</tr>
<tr>
<td>Pixie</td>
<td>Tiny</td>
</tr>
<tr>
<td>Satyr</td>
<td>Medium</td>
</tr>
<tr>
<td>Sprite</td>
<td>Tiny</td>
</tr>
<tr>
<td>Treant</td>
<td>Large</td>
</tr>
<tr>
<td>Unicorn</td>
<td>Large</td>
</tr>
</tbody></table>
<h3>Harper Hideout </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Harpers</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>You have a safe house hidden near your Bastion and connected to it by a tunnel no more than a quarter mile in length. Your hireling maintains the hideout, using a cover identity that doesn’t link them to your Bastion. You can change the location of your Harper Hideout each time you gain a level.</p>
<p><strong>Hideout Defenses.</strong> Your Harper Hideout is constantly protected by the Alarm spell. At level 9, your Harper Hideout can be connected to your Bastion by a magic doorway instead of a tunnel; anyone passing through the door from the Harper Hideout emerges from a specific door in your Bastion or vice versa, and your Harper Hideout can be located anywhere within 100 miles of your Bastion. At level 13, the facility can be located anywhere in Faerûn. At level 17, the magic doorway works across planes, and the facility can be anywhere in the multiverse.</p>
<p><strong>Empower: Harper Training.</strong> When you issue the Empower order to this facility, the facility’s hireling extends an invitation to another Harper agent nearby. Roll any die. If the number is odd, no Harper needs your facility and you gain no benefit from having issued the order. If the number rolled is even, a Friendly Harper takes up temporary residence in your hideout.</p>
<p>The Harper stays for 7 days. While at your Bastion, the Harper can share their knowledge. Any character who trains with the Harper here for at least 8 hours on each of those days gains proficiency in one of the following skills of their choice: Deception, Investigation, or Performance. This benefit lasts for 7 days.</p>
<p>The Harper won’t defend your Bastion and departs immediately if the Bastion is attacked.</p>
<h3>Lords' Alliance Noble Residence </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Lords’ Alliance</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Recruit</p>
<p>You maintain a luxurious apartment fit for the ruler of a city such as Neverwinter, Waterdeep, or Baldur’s Gate. Your hireling is a butler who tends to the resident’s needs.</p>
<p>After spending a Long Rest in your Noble Residence, you gain Heroic Inspiration.</p>
<p><strong>Recruit: Visiting Noble.</strong> When you issue the Recruit order to your Lords’ Alliance Noble Residence, you forgo sleeping in it for 14 days and instead make it available to a noble from a settlement that is a member of the Lords’ Alliance. Roll any die. If the number rolled is odd, no one accepts your invitation and you gain no benefit from having issued the order. If the number rolled is even, a noble from the settlement you chose accepts your invitation, arriving within 7 days and staying for another 7 days.</p>
<p>The visiting noble gossips about events and inhabitants in their home settlement, revealing to you the location of any creature familiar to you if that creature is within 50 miles of the settlement from which the noble has come, if that creature isn’t hidden by magic, and if that creature isn’t confined to a location that the DM deems beyond the noble’s ability to know. If the noble knows the location of the individual, they also tell you where that creature was for the 7 days prior to the noble’s departure for your Bastion.</p>
<p>The visiting noble won’t defend your Bastion and departs immediately if the Bastion is attacked.</p>
<h3>Order of the Gauntlet Tournament Field </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Order of the Gauntlet</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>The Order of the Gauntlet Tournament Field is a marked-off area for combat between two armed individuals. It includes room for spectators.</p>
<p>Your hireling is a Knight whose alignment matches your own. If your Bastion lacks facilities to house this knight, the knight secures accommodations in the inn or settlement closest to the Bastion. This knight isn’t a Bastion Defender, but if your Bastion is attacked, the knight reduces by 1 the number of dice you roll to determine how many Bastion Defenders are lost in the attack.</p>
<p><strong>Empower: Hold Tournament.</strong> When you issue the Empower order to this facility, you host a tournament at your Bastion. It takes 7 days for word of the tournament to spread to nearby settlements, and another 7 days for contestants to travel to your Bastion and participate in the tournament. You must spend 2,000 GP for prizes. At the conclusion of the tournament, your Renown Score with the Order of the Gauntlet increases by 1.</p>
<h3>Red Wizard Necropolis </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Red Wizards, ability to use a Spellcasting Focus</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Recruit</p>
<p>Red Wizards defend their strongholds with Undead minions. A Red Wizard Necropolis can accommodate up to eight Bastion Defenders.</p>
<p><strong>Recruit: Undead Defenders.</strong> Each time you issue the Recruit action to this facility, up to four Undead Bastion Defenders are created and take shelter in the crypts and burial chambers of your Red Wizard Necropolis. You can’t issue the Recruit order to this facility if it’s fully occupied.</p>
<p>Keep track of Undead Bastion Defenders you lose and deduct them from your Bastion Defenders roster. An Undead Bastion Defender returns to your Red Wizard Necropolis 14 days after being destroyed. Undead Bastion Defenders can’t return from being killed if the facility is shut down or fully occupied.</p>
<h3>Zhentarim Travel Station </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Zhentarim</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Research</p>
<p>The Zhentarim maintain stations to facilitate safe and swift long-distance travel on journeys (see chapter 2 of the Dungeon Master’s Guide). Your travel station includes temporary stabling facilities for four Large creatures; two Medium creatures occupy the same space as one Large creature there. The facility’s hirelings look after these creatures.</p>
<p><strong>Long-Distance Travel Speed.</strong> Finishing a Long Rest in your Bastion better prepares you for travel; your group’s maximum travel pace increases by one step (from Slow to Normal or from Normal to Fast).</p>
<p><strong>Research: Reconnaissance.</strong> When you issue the Research order to this facility, you commission the Zhentarim Travel Station’s hirelings to gather information that facilitates an upcoming journey. This work takes 7 days. For the duration of the journey, you have Advantage on Wisdom (Survival) checks to forage or navigate.</p>
<h2>Eberron: Forge of the Artificer Facilities</h2>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facility</th>
<th>Prerequisite</th>
<th>Order</th>
</tr>
<tr>
<td>5</td>
<td>Dragonmark Outpost</td>
<td>Renown 10+ with any dragonmarked house</td>
<td>Empower</td>
</tr>
<tr>
<td>9</td>
<td>Kundarak Vault</td>
<td>Renown 15+ with House Kundarak</td>
<td>Trade</td>
</tr>
<tr>
<td>9</td>
<td>Navigator's Helm</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>9</td>
<td>Orien Helm</td>
<td>Renown 15+ with House Orien</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Artificer's Forge</td>
<td>Ability to use Artisan’s Tools as a Spellcasting Focus</td>
<td>Craft</td>
</tr>
<tr>
<td>13</td>
<td>Inquisitive's Agency</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>13</td>
<td>Lyrandar Helm</td>
<td>Renown 25+ with House Lyrandar</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Manifest Zone</td>
<td>Ability to use a Spellcasting Focus</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Museum</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>17</td>
<td>Construct Forge</td>
<td>Ability to use Artisan’s Tools as a Spellcasting Focus</td>
<td>Recruit</td>
</tr>
</tbody></table>
<h3>Artificer's Forge </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use Artisan’s Tools as a Spellcasting Focus</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Craft</p>
<p>An Artificer’s Forge includes two magewright hirelings who are skilled in creating magic items.</p>
<p><strong>Crafting Assistants.</strong> If you create a magic item in your Bastion using the rules in the Dungeon Master’s Guide, one or both of this facility’s hirelings can assist you, reducing the time required for the crafting.</p>
<p><strong>Craft: Magic Item.</strong> When you issue the Craft order to this facility, you commission the facility’s hirelings to craft a Common or an Uncommon magic item chosen by you from the Dungeon Master’s Guide. The facility has the tool required to craft the item, and the hirelings have proficiency with that tool as well as proficiency in the Arcana skill. The two hirelings assist each other, reducing the time required to craft the item. If the item allows its user to cast any spells from it, the hirelings have those spells prepared.</p>
<p><strong>Charge Refreshment.</strong> Whenever a magic item in your Bastion regains charges, it regains 1 extra expended charge.</p>
<h3>Construct Forge </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use Artisan’s Tools as a Spellcasting Focus</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Recruit</p>
<p>A Construct Forge is used to create Constructs.</p>
<p><strong>Recruit: Construct.</strong> When you issue the Recruit order to this facility, you commission the facility’s hirelings to craft a Construct from the Forge Constructs table. The construction takes the time and costs you the amount listed in the table.</p>
<p>Constructs made in this facility count as Bastion Defenders. Deduct any you lose from your Bastion Defenders roster. You can choose not to count one or more of these creatures as Bastion Defenders, in which case they can’t be called on to defend the Bastion. Instead, they act in accordance with their nature and use their stat blocks in the Monster Manual.</p>
<table>
<tbody>
<tr>
<th>Creature</th>
<th>Time</th>
<th>Cost</th>
</tr>
<tr>
<td>Animated Armor</td>
<td>14 days</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Animated Broom</td>
<td>7 days</td>
<td>250 GP</td>
</tr>
<tr>
<td>Animated Flying Sword</td>
<td>7 days</td>
<td>250 GP</td>
</tr>
<tr>
<td>Animated Rug of Smothering</td>
<td>21 days</td>
<td>2,000 GP</td>
</tr>
<tr>
<td>Helmed Horror</td>
<td>42 days</td>
<td>5,000 GP</td>
</tr>
<tr>
<td>Scarecrow</td>
<td>14 days</td>
<td>1,000 GP</td>
</tr>
<tr>
<td>Shield Guardian</td>
<td>63 days</td>
<td>25,000 GP</td>
</tr>
<tr>
<td>Warforged Titan*</td>
<td>250 days</td>
<td>200,000 GP</td>
</tr>
</tbody></table>
<p>*The Warforged Titan stat block appears in Eberron: Rising from the Last War. Creating new Warforged Titans is illegal under the terms of the Treaty of Korth, which ended the Last War. Violating that treaty risks reigniting open war across Khorvaire.</p>
<h3>Dragonmark Outpost </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Renown 10+ with any dragonmarked house</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A Dragonmark Outpost is an area set aside for the use of your dragonmarked house. The hireling is a house agent and serves as a liaison between you and your superiors in the house.</p>
<p>When you add this facility to your Bastion, your Renown Score with your house increases by 1.</p>
<p><strong>Dragonmark Empowerment (Requires Any Dragonmark Feat).</strong> When you finish a Long Rest in your Bastion, you gain one extra spell slot of level 2. You can use this spell slot to cast only a spell you have prepared because of a Dragonmark feat.</p>
<p><strong>Empower: House Favor.</strong> When you issue the Empower order to this facility, you instruct your hireling to call in a favor from your dragonmarked house. You can use any benefit of your house that your Renown Score affords you (as described in Eberron: Forge of the Artificer), and this favor doesn’t count against the total number of favors available to you. Once you use this feature, you can’t use it again until your Renown Score with your house increases.</p>
<h3>Inquisitive's Agency </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>This facility is an office for an inquisitive agency - either the headquarters of an agency you control or a branch office for a larger agency (such as Information Acquisition or Karr’Aashta’s Investigations, both of which are discussed in Eberron: Forge of the Artificer). Its one hireling is a secretary who maintains an extensive directory of useful contacts and helpful agents.</p>
<p><strong>Research: Information Gathering.</strong> When you issue the Research order to this facility, you commission the agency’s secretary to gather information from contacts and agents regarding a specific individual you designate, assembling a comprehensive picture of that person’s activities during the previous 7 days and over the course of the next 7 days, within 10 miles of your Bastion. Unless the DM deems that certain information is beyond these agents’ ability to uncover, you learn the following information:</p>
<ul>
<li>Where the person is and has been staying</li>
<li>What they’ve spent money on</li>
<li>Whom they’ve met with</li>
<li>Where they’ve shown identification papers to the authorities</li>
</ul>
<p>If your Bastion is mobile, it takes time to establish this network of agents in a new place. When your Bastion is traveling, you can’t issue the Research order to this facility. After it arrives at its destination, the first time you issue the Research order, this facility’s hireling spends 7 days establishing a new network, after which you can use the Research order normally.</p>
<h3>Kundarak Vault </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Renown 15+ with House Kundarak</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Trade</p>
<p>A Kundarak Vault occupies space in your Bastion like any other special facility, but it is an extradimensional space that can be accessed from other places. As a Kundarak facility, it provides exceptionally secure storage for your trade goods and other treasures. Only you and your Bastion’s hirelings can open the vault door.</p>
<p><strong>Kundarak Access.</strong> Because the vault is an extradimensional space, you (and only you) can access its contents from any Kundarak bank facility in the world. These banks are found in cities across Khorvaire (and also in Stormreach, in Xen’drik).</p>
<p><strong>Trade: Goods.</strong> When you issue the Trade order to this facility, its hireling spends the next 7 days procuring nonmagical items that have a total value of 2,000 GP or less and stores them in the Kundarak Vault, or the hireling uses those 7 days to sell goods in the Kundarak Vault. You bear the total cost of any purchases, and the maximum value of the items purchased increases to 5,000 GP when you reach level 13.</p>
<p>When you sell goods from your Kundarak Vault, the buyer pays you 20 percent more than the standard price; this profit increases to 50 percent when you reach level 13 and 100 percent when you reach level 17.</p>
<h3>Lyrandar Helm </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Renown 25+ with House Lyrandar</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A Lyrandar Helm allows a mobile Bastion built within an elemental airship or an elemental galleon to travel. This facility’s hireling is a dragonmarked heir of House Lyrandar. On an elemental airship, the airship’s Helm crew station is part of this facility (see chapter 7).</p>
<p><strong>Empower: Travel.</strong> When you issue the Empower order to this facility, you instruct its hireling to pilot the Bastion to a destination you specify. The Bastion travels at the vehicle’s speed, 8 hours per day, for the duration of the Bastion turn. The Bastion stops early when it reaches the specified destination or if something happens to stop your travel.</p>
<p>When you issue the Empower order to this facility, the DM rolls on the Bastion Events table as if you had issued the Maintain order to your Bastion.</p>
<h3>Manifest Zone </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Ability to use a Spellcasting Focus</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A Bastion with a Manifest Zone is infused with the planar energy of one of Eberron’s planes of existence. Choose the plane when you build this facility.</p>
<p><strong>Empower: Manifest Charm.</strong> When you issue the Empower order to this facility, the facility’s hireling conducts magical rites for the next 7 days. At the end of that period, you gain a special Charm (see “Supernatural Gifts” in the Dungeon Master’s Guide) called a Manifest Charm, which lasts until you use it. You don’t need to be in the Bastion while the rites are performed to gain their benefit. The effects of the Charm depend on the facility’s linked plane:</p>
<ul>
<li><strong>Daanvi, the Perfect Order.</strong> You can expend the Charm (no action required) to end the Blinded, Deafened, Paralyzed, or Poisoned condition on yourself.</li>
</ul>
<ul>
<li><strong>Dolurrh, the Realm of the Dead.</strong> When you use a spell slot to cast a spell from the Necromancy school, you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Fernia, the Sea of Fire.</strong> When you use a spell slot to cast a spell that deals Fire damage, you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Irian, the Eternal Dawn.</strong> When you use a spell slot to cast a spell that restores Hit Points or deals Radiant damage, you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Lamannia, the Twilight Forest.</strong> When you use a spell slot to cast a spell that conjures or summons a Beast, an Elemental, or a Fey (including Conjure Animals, Conjure Elemental, Conjure Fey, Conjure Minor Elementals, Conjure Woodland Beings, Find Steed, Summon Beast, Summon Elemental, or Summon Fey), you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Mabar, the Endless Night.</strong> When you use a spell slot to cast a spell that animates or summons an Undead (including Animate Dead, Create Undead, or Summon Undead), you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Risia, the Plain of Ice.</strong> When you use a spell slot to cast a spell that deals Cold damage, you can expend the Charm (no action required) to treat the spell as if it were cast using a spell slot 1 level above the slot expended.</li>
</ul>
<ul>
<li><strong>Shavarath, the Battleground.</strong> When you score a Critical Hit, you can expend the Charm (no action required) to deal an extra 10 damage of one of the types dealt by the attack.</li>
</ul>
<ul>
<li><strong>Syrania, the Azure Sky.</strong> You can expend the Charm as a Bonus Action to gain a Fly Speed equal to your Speed for 1 minute.</li>
</ul>
<ul>
<li><strong>Thelanis, the Faerie Court.</strong> When you cast a spell from the Enchantment or Illusion school, you can expend the Charm (no action required) to give one target of the spell Disadvantage on its saving throw against the spell.</li>
</ul>
<ul>
<li><strong>Xoriat, the Realm of Delirium.</strong> When you use a spell slot to cast a spell, you can expend the Charm (no action required) to roll on the Wild Magic Surge table in the Player’s Handbook.</li>
</ul>
<p>If your Bastion is mobile, its connection to the linked plane of existence is suspended while the Bastion moves, and you can’t issue the Empower order to this facility while it is in transit. When the Bastion reaches a destination, you can issue the Empower order to establish a new planar connection, linking the Bastion either to the same plane of existence or to a different one you choose. Establishing the new connection takes 7 days, after which you can issue the Empower order normally.</p>
<h3>Museum </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>A Museum contains relics and treasures brought back from expeditions you participated in or sponsored, carefully cataloged and displayed.</p>
<p><strong>Research: Specialized Lore.</strong> When you issue the Research order to this facility, you commission the hireling to study particular treasures in the museum. The work takes 7 days. The hireling gains knowledge regarding some question of ancient history as if they had cast the Legend Lore spell, then shares this knowledge with you the next time you speak with them.</p>
<p><strong>Secrets of the Past.</strong> Your Museum contains one treasure that gives you a magical Charm (see “Supernatural Gifts” in the Dungeon Master’s Guide) when you spend 7 days studying it and then finish a Long Rest in your Bastion. The Charm lasts for 7 days or until you use it. You can’t gain another Charm from this facility while you still have one. The effect of the Charm depends on the origin of the treasure in your Museum. You can choose one of the following options (your DM might make more options available or limit the existing options based on your past expeditions):</p>
<ul>
<li><strong>Charm of Argonnessen.</strong> While you have this Charm, you know Draconic. You can expend the Charm to cast Dragon’s Breath (level 4 version), targeting yourself only.</li>
</ul>
<ul>
<li><strong>Charm of Ashtakala.</strong> While you have this Charm, you know Abyssal and Infernal. You can expend the Charm to cast Ray of Sickness (level 4 version).</li>
</ul>
<ul>
<li><strong>Charm of Dhakaan.</strong> While you have this Charm, you know the Goblin language. You can expend the Charm to cast Staggering Smite.</li>
</ul>
<ul>
<li><strong>Charm of Khyber</strong>. While you have this Charm, you have Darkvision with a range of 120 feet. You can expend the Charm to gain Truesight with a range of 60 feet for 1 minute.</li>
</ul>
<ul>
<li><strong>Charm of Xen’drik.</strong> While you have this Charm, you know the Giant language. As a Bonus Action, you can expend the Charm to change your Strength score to 25 for 1 hour.</li>
</ul>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Museum to a Vast facility by spending 2,000 GP. If you do so, the Museum can have two treasures with different origins. A Vast Museum gains two additional hirelings, for a total of three. Assign names and personalities to them as you see fit.</p>
<h3>Navigator's Helm </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A Navigator’s Helm allows a mobile Bastion built within a mundane waterborne vehicle to travel.</p>
<p><strong>Empower: Travel.</strong> When you issue the Empower order to this facility, you instruct its hireling to pilot the Bastion to a destination you specify. The Bastion sails at the vehicle’s speed, 8 hours per day, for the duration of the Bastion turn. The Bastion stops early when it reaches the specified destination or if something happens to stop your travel.</p>
<p>When you issue the Empower order to this facility, the DM rolls on the Bastion Events table as if you had issued the Maintain order to your Bastion.</p>
<h3>Orien Helm </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Renown 15+ with House Orien</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>An Orien Helm allows a mobile Bastion built within a Lightning Rail cart to travel. This facility’s hireling is a dragonmarked heir of House Orien.</p>
<p><strong>Empower: Travel.</strong> When you issue the Empower order to this facility, you instruct its hireling to pilot the Bastion to a destination you specify. The Bastion travels at a rate of 30 miles per hour, 8 hours per day, along an existing route of conductor stones for the duration of the Bastion turn. The Bastion stops early when it reaches the specified destination or if something happens to stop your travel.</p>
<p>When you issue the Empower order to this facility, the DM rolls on the Bastion Events table as if you had issued the Maintain order to your Bastion.</p>
<h2>Ravenloft: The Horrors Within Facilities</h2>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facility</th>
<th>Prerequisite</th>
<th>Order</th>
</tr>
<tr>
<td>5</td>
<td>Rookery</td>
<td>None</td>
<td>Craft</td>
</tr>
<tr>
<td>5</td>
<td>Séance Parlor</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>9</td>
<td>Ancient Altar</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>9</td>
<td>Cabinet of Curiosities</td>
<td>None</td>
<td>Trade</td>
</tr>
<tr>
<td>9</td>
<td>Infirmary</td>
<td>Proficiency in the Medicine skill</td>
<td>Craft</td>
</tr>
<tr>
<td>13</td>
<td>Lightning Generator</td>
<td>None</td>
<td>Empower</td>
</tr>
<tr>
<td>13</td>
<td>Spirit Vault</td>
<td>None</td>
<td>Research</td>
</tr>
<tr>
<td>17</td>
<td>Liminal Space</td>
<td>None</td>
<td>Recruit</td>
</tr>
</tbody></table>
<h3>Ancient Altar </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>An Ancient Altar is a solemn chamber where you can make offerings to mysterious forces.</p>
<p><strong>Empower:</strong> Purge Haunted Facility. You commission your hireling to lead a ritual that takes 7 days, during which time you must remain in the Bastion. At the end of the ritual, you must offer a worthy sacrifice, which can be monetary (1,000 GP) or blood (the fresh corpse of at least one Large creature or four Medium creatures that aren’t Constructs or Undead). If you make a blood sacrifice, roll on the Bastion Hauntings table. Once the ritual is complete, the sacrifice is destroyed. Choose a Haunted special facility in this Bastion or in a Bastion connected to this one; that facility is no longer Haunted.</p>
<p><strong>Blasphemous Charm.</strong> After spending a Long Rest in your Ancient Altar, you gain a magical Charm that lasts for 7 days or until you use it. You can use the Charm as a Magic action to cast Hunger of Hadar without requiring Material components. You can’t gain this Charm again while you have it.</p>
<h3>Cabinet of Curiosities </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Trade</p>
<p>A Cabinet of Curiosities is a small salon, closet space, or antechamber where you can keep and catalog peculiar objects and fascinating oddities.</p>
<p><strong>Trade:</strong> Acquire Curios. When you issue the Trade order to this facility, you supply this facility’s hireling with a certain amount of gold and commission them to purchase strange items from unusual sources. It takes 28 days for the hireling to return to the Bastion with one or more magic items for you. Your investment determines the rarity of these items, and the quantity of magic items depends on the number of Haunted special facilities in your Bastion at the time of the hireling’s return, as shown on the Curio Investment and Curios Collected tables.</p>
<table>
<tbody>
<tr>
<th>Investment</th>
<th>Item Rarity</th>
<th>Haunted Facilities</th>
<th>Magic Items Acquired</th>
<th>Cursed Item Chance (1d100)</th>
</tr>
<tr>
<td>150 GP</td>
<td>Common</td>
<td>0</td>
<td>1</td>
<td>-</td>
</tr>
<tr>
<td>600 GP</td>
<td>Uncommon</td>
<td>1-2</td>
<td>1-2 (flip a coin)</td>
<td>01-10</td>
</tr>
<tr>
<td>6,000 GP</td>
<td>Rare</td>
<td>3-5</td>
<td>1d3</td>
<td>01-20</td>
</tr>
<tr>
<td>60,000 GP</td>
<td>Very Rare</td>
<td>6</td>
<td>1d4</td>
<td>01-25</td>
</tr>
</tbody></table>
<p>To determine how many magic items your hireling brings back, count the Haunted special facilities in your Bastion, then roll the die indicated in the Magic Items Acquired column on the Curios Collected table. The DM rolls on the Cursed Item Chance (1d100) column to determine whether one of the magic items carries a curse. The DM chooses which item is cursed and establishes the nature of the curse.<br/>
For each magic item acquired, roll on a table in the “Random Magic Items” section in the Dungeon Master’s Guide of the corresponding rarity to determine what the item is. (Select the treasure theme randomly.)</p>
<h3>Infirmary </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Proficiency in the Medicine skill</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Craft</p>
<p>An Infirmary provides emergency healing and continual care to injured or sick Bastion occupants.</p>
<p><strong>Craft Options.</strong> When you issue the Craft order to this facility, choose one of the following options:</p>
<p><strong>Craft: Antitoxin.</strong> You commission the facility’s hirelings to craft two vials of Antitoxin. The work takes 7 days and costs no money. You can spend 50 GP during the creation process to enhance one of the vials of Antitoxin, or 100 GP to enhance both. An enhanced Antitoxin ends the Poisoned condition on the creature that drinks it. An enhanced Antitoxin loses this enhancement after 28 days.</p>
<p><strong>Craft: Enhanced Potion of Healing.</strong> You commission this facility’s hirelings to increase the potency of up to two Potions of Healing. You must provide the potions to be enhanced, and the process takes 14 days to complete. A Potion of Healing becomes a Potion of Healing (greater). When you reach level 13 you can provide up to two Potions of Healing (greater), each of which becomes a Potion of Healing (superior).</p>
<p><strong>Triage.</strong> When your Bastion is attacked and you roll a number of dice to determine how many Bastion Defenders are lost, you can reroll a number of those dice equal to the number of hirelings this facility has. You must use the new roll.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Infirmary to a Vast facility by spending 2,000 GP. If you do so, the Infirmary gains two hirelings, and the number of Antitoxins or Potions of Healing you can enhance at a time increases to four.</p>
<h3>Lightning Generator </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A Lightning Generator can transform atmospheric electricity to serve a variety of useful functions.</p>
<p><strong>Charm of Electromancy.</strong> After spending a Long Rest in your Lightning Generator, you take 8d6 Lightning damage and you gain a magical Charm that lasts for 7 days (see the Dungeon Master’s Guide for rules on Charms). The Charm has 3 charges. You can expend 1 charge from the Charm to cast the Telekinesis spell. Once all its charges are expended, the Charm vanishes from you.</p>
<p><strong>Revivification.</strong> When you cast the spell Raise Dead and Resurrection while in this facility, the cost of that spell’s Material components are reduced by 1,000 GP (minimum of 0).</p>
<p><strong>Empower:</strong> Lightning Life. The facility’s hireling channels the Generator’s energy to cast Animate Objects, targeting one Large or Huge object of your choice in the Bastion. The spell’s duration is 7 days and doesn’t require Concentration.</p>
<h3>Liminal Space </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Recruit</p>
<p>Your Bastion becomes connected to an unfathomable demiplane filled with vast, empty spaces and strange beings. This special facility doesn’t take up space in your Bastion; instead, the entrance to this facility appears in the closets, crawlspaces, and shadows of your Bastion’s other basic and special facilities. The hireling in charge of this facility protects the Bastion’s inhabitants from stray entities that slip out from the demiplane. This facility always counts as Haunted.</p>
<p><strong>Dark Bargains.</strong> You can enter this facility and wander within for 7 days, consulting and bargaining with the strange entities there. If you leave the Bastion during this time, you gain no benefit. At the end of the seventh day, you gain a Dark Gift feat of your choice (see chapter 1). You can only have one feat from this benefit at a time; if you use this benefit when you already have a feat from it, the feat you gain at the end of the seven days replaces any feat previously gained from use of this facility.</p>
<p><strong>Recruit:</strong> Stranger. When you issue the Recruit order to this facility, you instruct the facility’s hireling to conduct a ritual and petition an entity from the demiplane for aid. This ritual takes 7 days and costs 1,000 GP. At the ritual’s end, roll any die. On an odd number, the summoned entity refuses your request and kills the hireling, and this facility can’t be used until your next Bastion turn, at which point the hireling is replaced at no cost to you; on an even number, the summoned entity agrees to your request and takes up residence in your Liminal Space.</p>
<p>While residing in your Liminal Space, an entity counts as a Bastion Defender, and if your Bastion is attacked, each entity in your Liminal Space reduces by 1 the number of dice you roll to determine how many Bastion Defenders are lost in the attack. You can choose not to count the entity as a Bastion Defender, in which case you can’t call on it to defend the Bastion; instead, the entity acts according to its nature, using the Unspeakable Horror stat block (see chapter 5). You can have up to three entities in your Liminal Space at a time. Deduct any you lose from your Bastion Defenders roster.</p>
<h3>Rookery </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Craft</p>
<p>A number of ravens equal to your character level roost in a Rookery. Whenever a creature enters the facility, the birds uncannily track its movement, an unfathomable intelligence behind their beady eyes.</p>
<p><strong>Craft: Mist Talisman.</strong> When you issue the Craft order to this facility, you can commission the hireling to send ravens to various contacts in a Domain of Dread you have either visited previously or heard about from a creature that has been within said domain. This work takes 21 days, during which time no other activity can occur within this facility.</p>
<p>At the end of this period, the hireling produces a Mist talisman linked to the chosen Domain of Dread.</p>
<p><strong>Messenger Ravens.</strong> Whenever you finish a Long Rest in your Bastion, you can send one raven bearing a written message of 25 words or fewer to a creature you have met or a creature described to you by someone who has met it. After receiving this message, the recipient can reply in a like manner, attaching their response to the raven. Regardless of whether or not the recipient responds, the raven returns to the rookery after 7 days have passed.</p>
<p>You can send a message via raven in this way across any distance, though the message recipient must be on the same plane of existence as your Bastion or in a demiplane linked to yours by the Mists of Ravenloft. A messenger raven delivers the message regardless of any magical wards or other interposing forces, including the Mists and closed borders of a Domain of Dread. If the raven is unable to deliver your message, it returns to your rookery after 7 days with your original message still attached.</p>
<h3>Séance Parlor </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>The veil between the world of the living and the dead grows thin in a Séance Parlor.</p>
<p><strong>Research: Fortune Telling.</strong> When you issue the Research order to this facility, you commission its hireling to read your fortune by casting bones, interpreting tea leaves, performing a tarokka reading, or using some other means. After your fortune is read, you gain Heroic Inspiration. You can’t gain this benefit again until you finish a Long Rest.</p>
<p><strong>Speak with Dead.</strong> After spending a Long Rest in your Séance Parlor, you can cast Speak with Dead immediately without expending a spell slot or needing Material components. When you cast it in this way, you can target any deceased creature whose name you know, as long as you have a piece of its remains (such as ashes or a bone) or an object that was important to the creature in life (such as a brooch or signature weapon). The target speaks through an implement in the Séance Room such as a crystal ball or spirit board.</p>
<h3>Spirit Vault </h3>
<p><em>Level 13 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> None</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>A Spirit Vault is magically warded to imprison and exorcise malevolent spirits and other supernatural forces. Haunted portraits, cursed relics, and other eerie curios line the shelves of this dark vault. This facility always counts as Haunted.</p>
<p><strong>Esoteric Knowledge.</strong> After spending a Long Rest in your Spirit Vault, you gain one of the following magical Charms:</p>
<p><strong>Charm of Exorcism.</strong> You can use the Charm as a Magic action to cast Dispel Evil and Good or Remove Curse without requiring Material components.</p>
<p><strong>Charm of Malediction.</strong> You can use the Charm as a Magic action to cast Hex (level 3 version) or Bestow Curse without requiring Material components.</p>
<p>The Charm lasts for 7 days or until you use it. Intelligence, Wisdom, or Charisma is your spellcasting ability for the Charm’s spells (choose each time you gain this Charm).</p>
<p><strong>Research: Ask the Occult.</strong> When you issue the Research order to this facility, you or its hireling study the various relics and question the imprisoned entities within your Spirit Vault. This work takes 7 days. At the end of this time, roll 1d6. On a 1, the work is psychically taxing; if you did the research, you take 6d6 Psychic damage, and if the hireling did the research, they immediately die, and this facility can’t be used again until your next Bastion turn. Otherwise, you or the hireling gain information as if you had successfully cast the Contact Other Plane spell. The hireling shares any information they learned with you the next time you speak.</p>
<h2>Arcana Unleashed Facilities</h2>
<table>
<tbody>
<tr>
<th>Level</th>
<th>Special Facility</th>
<th>Prerequisite</th>
<th>Order</th>
</tr>
<tr>
<td>5</td>
<td>Entertainment Salon</td>
<td>Membership in the Bejeweled Conclave</td>
<td>Research</td>
</tr>
<tr>
<td>5</td>
<td>Geothermal Vent</td>
<td>Membership in the Crucible Keepers</td>
<td>Empower</td>
</tr>
<tr>
<td>5</td>
<td>Morgue</td>
<td>Membership in the Covenant of the Grave</td>
<td>Research</td>
</tr>
<tr>
<td>5</td>
<td>Soup Kitchen</td>
<td>Membership in the Sheltering Hands</td>
<td>Recruit</td>
</tr>
<tr>
<td>5</td>
<td>Transmutation Vat</td>
<td>Membership in the Bringers of Cosmic Dawn</td>
<td>Harvest</td>
</tr>
<tr>
<td>9</td>
<td>Circus Tent</td>
<td>Membership in the Phantasmic Circus</td>
<td>Trade</td>
</tr>
<tr>
<td>9</td>
<td>Heist Planning Chamber</td>
<td>Membership in the Ninth Quill</td>
<td>Research</td>
</tr>
<tr>
<td>9</td>
<td>Lighthouse</td>
<td>Membership in the Seers of Sea and Sky</td>
<td>Harvest</td>
</tr>
<tr>
<td>17</td>
<td>Planar Gateway</td>
<td>Membership in the Horizon Weavers; ability to use an Arcane Focus, a Holy Symbol, or a tool as a Spellcasting Focus</td>
<td>Empower</td>
</tr>
</tbody></table>
<h3>Circus Tent </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Phantasmic Circus</p>
<p><strong>Space:</strong> Vast</p>
<p><strong>Hirelings:</strong> 4</p>
<p><strong>Order:</strong> Trade</p>
<p>The Circus Tent is a space for musical, acrobatic, comedic, or other performances intended to delight a crowd. The tent includes seating for audience members. Your hirelings are Performers whose alignment matches your own. Assign names, personalities, and circus acts to them as you see fit.</p>
<p><strong>Trade:</strong> Circus Performance. When you issue the Trade order to this facility, the facility’s hirelings turn the Circus Tent into a performance venue for 7 days. At the end of the seventh day, your portion of the proceeds is equal to 2d6 × 10 GP.</p>
<h3>Entertainment Salon </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Bejeweled Conclave</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 2</p>
<p><strong>Order:</strong> Research</p>
<p>This fancy salon boasts elegant wall hangings, comfortable reclining couches, and a well-stocked bar.</p>
<p><strong>Open Pockets.</strong> Your eloquent hirelings convince others to pay a little more or to accept a little less. When you roll a die to determine how many Gold Pieces you pay or gain for a Bastion order or event, you can roll twice and take either result.</p>
<p><strong>Research: Learn Secrets.</strong> When you issue the Research order to this facility, you direct the facility’s hirelings to entertain well-informed contacts and learn about a specific creature you name within 50 miles of your Bastion. After 7 days of work, the hirelings gain 1d4 facts about the named creature that aren’t widely known and might be amusing, embarrassing, or useful. The hirelings also discover the creature’s power relative to yours (such as whether the creature’s CR is higher than, lower than, or the same as your level). At the DM’s discretion, you might receive limited or incorrect information about an exceptionally private or supernaturally disguised creature.</p>
<h3>Geothermal Vent </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Crucible Keepers</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>A geothermal vent draws heat from deep below the surface to provide energy and power simple machines.</p>
<p><strong>Empower: Withstand Heat.</strong> When you issue the Empower order to this facility, for the next 7 days, the facility’s hireling teaches a series of meditative techniques that allow a character to mitigate the injuries they suffer from flames. Any character who trains here for at least 8 hours on each of those days gains the following benefit at the end of the training period:</p>
<p><strong>Heat Tolerant.</strong> When you take Fire damage, you can take a Reaction to reduce this damage by 1d4 plus your level. This benefit lasts for 7 days.</p>
<p><strong>Hot Water.</strong> Your basic facilities benefit from a constant source of adjustable heat. For example, a dining room has a warming table to keep food hot, a kitchen has multiple ovens with varying heat, and a bedroom has a basin that warms water for washing.</p>
<h3>Heist Planning Chamber </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Ninth Quill</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>This room has a planning table, pieces of miniature terrain to represent walls or furniture, and tomes on magical security, architecture, and spy craft useful when planning a heist.</p>
<p><strong>Research: Reconnaissance.</strong> When you issue the Research order to this facility, your hireling sends spies to evaluate a building within 50 miles of your Bastion. This work takes 7 days. At the end of the seventh day, the hireling provides a model of the building on the planning table. Public areas of the building are depicted accurately, and private areas are depicted only generally. Any area concealed by magic or protected by powerful guardians, at the DM’s discretion, might not be depicted accurately or at all. The spies avoid all creatures, so information about the building’s inhabitants is sparse.</p>
<p>The model remains until you use the Research order on this facility again, but it might become inaccurate over time if the building changes.</p>
<p><strong>Heist Preparations.</strong> A character who prepares for a theft or infiltration using the model for at least 8 hours chooses one of the following roles. The role’s benefit applies while the character is within 1 mile of the building depicted by the model and lasts for 7 days or until you prepare again:</p>
<p><strong>Enforcer:</strong> Advantage on Charisma (Intimidation) checks<br/>
<strong>Face:</strong> Advantage on Charisma (Deception) checks<br/>
<strong>Lookout:</strong> Advantage on Wisdom (Perception) checks<br/>
<strong>Medic:</strong> Advantage on Wisdom (Medicine) checks<br/>
<strong>Sneak:</strong> Advantage on Dexterity (Stealth) checks<br/>
<strong>Thief:</strong> Advantage on Dexterity (Sleight of Hand) checks</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Heist Planning Chamber to a Vast facility by spending 2,000 GP. If you do so, the range of Reconnaissance increases to 500 miles, and a character preparing for a heist can choose two roles, gaining the benefits of both.</p>
<h3>Lighthouse </h3>
<p><em>Level 9 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Seers of Sea and Sky</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Harvest</p>
<p>This tall lighthouse has rotating lenses that make its light visible from a significant distance, even in poor weather. Your hireling operates and maintains the machinery and ignites or douses the light as you direct.</p>
<p><strong>Vision Charm.</strong> Time in your lighthouse inspires you to pierce the darkness. After spending a Long Rest in your Lighthouse, you gain the Charm of Darkvision (see the Dungeon Master’s Guide).</p>
<p><strong>Harvest: Illuminate Treasure.</strong> When you issue the Harvest order to this facility, you instruct the facility’s hireling to watch the surrounding area for lost or discarded valuables. The hireling watches for 7 days. At the end of that time, you can hire salvagers to retrieve treasures your hireling spotted. You must spend 100 GP to hire the salvagers, who return with treasure worth 1d4 × 100 GP.</p>
<h3>Morgue </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Covenant of the Grave</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Research</p>
<p>A morgue is a location where corpses are stored and studied. You can store up to four Small or Medium corpses in the Morgue.</p>
<p><strong>Corpse Storage.</strong> As long as this facility’s hireling is present, each corpse stored in the Morgue is affected by the Gentle Repose spell. If the facility lacks a hireling or a corpse is removed, the facility’s corpses or the removed corpse loses this protection until returned to a Morgue with a hireling.</p>
<p><strong>Research:</strong> Cadaver Insights. When you issue the Research order to this facility, you instruct the facility’s hireling to carefully inspect the corpses. This work takes 7 days. The next time you speak with the hireling, the hireling can share the cause of death of each corpse present and answer one question you have for each corpse as though the hireling had cast the Speak with Dead spell on it.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Morgue to a Roomy facility by spending 2,000 GP. If you do so, the Morgue can store up to twelve Small or Medium corpses and up to one Large corpse.</p>
<h3>Planar Gateway </h3>
<p><em>Level 17 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Horizon Weavers; ability to use an Arcane Focus, a Holy Symbol, or a tool as a Spellcasting Focus</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Empower</p>
<p>The focus of this chamber is an inscribed stone archway filled with mist and strange lights. This archway can connect to other planes of existence.</p>
<p><strong>Empower: Open Gate.</strong> When you issue the Empower order to this facility, you instruct the facility’s hireling to tune the archway to a place on another plane of existence. Tuning the archway takes 7 days, at the end of which time the gateway opens. If you provide a diamond worth 5,000+ GP as part of the tuning, the gate connects to a place you specify on another plane, as with the Gate spell (for transport only, not to draw a specific creature through) and destroys the diamond. If you don’t provide a diamond or if a deity or another planar ruler blocks the intended gate from opening, determine the gate’s destination randomly on the Random Planar Destination table. In either case, the gateway remains open for 1 minute.</p>
<strong>Random Planar Destinations</strong><br/>
<table>
<tbody>
<tr>
<th>1d100</th>
<th>Destination</th>
</tr>
<tr>
<td>01-04</td>
<td>Abyss</td>
</tr>
<tr>
<td>05-08</td>
<td>Acheron</td>
</tr>
<tr>
<td>09-12</td>
<td>Arborea</td>
</tr>
<tr>
<td>13-16</td>
<td>Arcadia</td>
</tr>
<tr>
<td>17-20</td>
<td>Astral Plane</td>
</tr>
<tr>
<td>21-24</td>
<td>Beastlands</td>
</tr>
<tr>
<td>25-28</td>
<td>Bytopia</td>
</tr>
<tr>
<td>29-32</td>
<td>Carceri</td>
</tr>
<tr>
<td>33-36</td>
<td>Elemental Plane of Air</td>
</tr>
<tr>
<td>37-40</td>
<td>Elemental Plane of Earth</td>
</tr>
<tr>
<td>41-44</td>
<td>Elemental Plane of Fire</td>
</tr>
<tr>
<td>45-48</td>
<td>Elemental Plane of Water</td>
</tr>
<tr>
<td>49-52</td>
<td>Elysium</td>
</tr>
<tr>
<td>53-56</td>
<td>Ethereal Plane</td>
</tr>
<tr>
<td>57-60</td>
<td>Feywild</td>
</tr>
<tr>
<td>61-64</td>
<td>Gehenna</td>
</tr>
<tr>
<td>65-68</td>
<td>Hades</td>
</tr>
<tr>
<td>69-72</td>
<td>Limbo</td>
</tr>
<tr>
<td>73-76</td>
<td>Mechanus</td>
</tr>
<tr>
<td>77-80</td>
<td>Mount Celestia</td>
</tr>
<tr>
<td>81-84</td>
<td>Nine Hells</td>
</tr>
<tr>
<td>85-88</td>
<td>Outlands</td>
</tr>
<tr>
<td>89-92</td>
<td>Pandemonium</td>
</tr>
<tr>
<td>93-96</td>
<td>Shadowfell</td>
</tr>
<tr>
<td>97-00</td>
<td>Ysgard</td>
</tr>
</tbody></table>
<h3>Soup Kitchen </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Sheltering Hands</p>
<p><strong>Space:</strong> Roomy</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Recruit</p>
<p>This kitchen prepares large quantities of food and serves it to hungry people.</p>
<p><strong>Recruit: Kitchen Operation.</strong> When you issue the Recruit order to this facility, you instruct your hireling to operate the soup kitchen for 7 days. Ingredients cost you 50 GP. If you would lose a Bastion Defender or a hireling on the next roll on the Bastion Events table, someone who believes in your work steps into their place and takes over immediately. You don’t count as losing that Bastion Defender or hireling.</p>
<p><strong>Traveling Snacks.</strong> After spending a Long Rest in your Bastion, you gain a magical Charm that lasts for 7 days or until you use it. The Charm allows you to cast Goodberry once without expending a spell slot.</p>
<h3>Transmutation Vat </h3>
<p><em>Level 5 Bastion Facility</em></p>
<p><strong>Prerequisite:</strong> Membership in the Bringers of Cosmic Dawn</p>
<p><strong>Space:</strong> Cramped</p>
<p><strong>Hirelings:</strong> 1</p>
<p><strong>Order:</strong> Harvest</p>
<p>This laboratory features a vat or cauldron simmering with transformation potential.</p>
<p><strong>Harvest:</strong> Fluid Transmutation. When you issue the Harvest order to this facility, you instruct your hireling to pour a substance into the vat and transform it into something else. You must expend a Common or Uncommon potion, which is destroyed in the vat. At the end of 7 days, the hireling produces your choice of a flask of Alchemist’s Fire, a vial of Antitoxin, a vial of Basic Poison, or a Common or Uncommon potion of your choice.</p>
<p><strong>Enlarging the Facility.</strong> You can enlarge your Transmutation Vat into a Roomy facility by spending 2,000 GP. When you issue the Harvest order to a Roomy Transmutation Vat, you can expend two Common or Uncommon potions. If you do, your hireling produces two substances of your choice instead of one; the options can be different.</p>
<h2><strong>Bastion Events</strong></h2>
<p>Immediately after a character issues the Maintain order to their Bastion, the DM rolls once on the Bastion Events table to determine what event, if any, befalls the Bastion before the next Bastion Turn. If an event occurs, the DM reads the event aloud to the player whose character controls that Bastion. (All the events are described in the sections following the table.) The event is resolved immediately, with the player and DM working together to expand story details as needed. If multiple characters issue the Maintain order on the same Bastion turn, roll once on the table for each of them, resolving each event separately even if the Bastions are combined.</p>
<p>Bastion events occur only when a Bastion is operating under the Maintain order, which often means that the Bastion’s owner isn’t present in the Bastion at the time. That means these events can be opportunities for the player to take on the role of the Bastion’s hirelings and roleplay their reactions to these events. The DM can even turn a Bastion event into a cutscene where each player takes on the role of one of the Bastion’s hirelings (under the guidance of the player whose character owns the Bastion).</p>
<table>
<tbody>
<tr>
<th>1d100</th>
<th>Event</th>
</tr>
<tr>
<td>01-50</td>
<td>All is Well</td>
</tr>
<tr>
<td>51-55</td>
<td>Attack</td>
</tr>
<tr>
<td>56-58</td>
<td>Criminal Hireling</td>
</tr>
<tr>
<td>59-63</td>
<td>Extraordinary Opportunity</td>
</tr>
<tr>
<td>64-72</td>
<td>Friendly Visitors</td>
</tr>
<tr>
<td>73-76</td>
<td>Guest</td>
</tr>
<tr>
<td>77-79</td>
<td>Lost Hirelings</td>
</tr>
<tr>
<td>80-83</td>
<td>Magical Discovery</td>
</tr>
<tr>
<td>84-91</td>
<td>Refugees</td>
</tr>
<tr>
<td>92-98</td>
<td>Request for Aid</td>
</tr>
<tr>
<td>99-00</td>
<td>Treasure</td>
</tr>
</tbody></table>
<h3>Event Descriptions</h3>
<h4>All Is Well </h4>
<p>Nothing significant happens. Roll on the following table, fleshing out the details as you see fit.</p>
<table>
<tbody>
<tr>
<th>1d8</th>
<th>Details</th>
</tr>
<tr>
<td>1</td>
<td>Accident reports are way down.</td>
</tr>
<tr>
<td>2</td>
<td>The leak in the roof has been fixed.</td>
</tr>
<tr>
<td>3</td>
<td>No vermin infestations to report.</td>
</tr>
<tr>
<td>4</td>
<td>You-Know-Who lost their spectacles again.</td>
</tr>
<tr>
<td>5</td>
<td>One of your hirelings adopted a stray dog.</td>
</tr>
<tr>
<td>6</td>
<td>You received a lovely letter from a friend.</td>
</tr>
<tr>
<td>7</td>
<td>Some practical joker has been putting rotten eggs in people’s boots.</td>
</tr>
<tr>
<td>8</td>
<td>Someone thought they saw a ghost.</td>
</tr>
</tbody></table>
<h4>Attack </h4>
<p>A hostile force attacks your Bastion but is defeated.</p>
<p>Roll 6d6; for each die that rolls a 1, one Bastion Defender dies. Remove these Bastion Defenders from your Bastion’s roster. If the Bastion has zero Bastion Defenders, one of the Bastion’s special facilities (determined randomly) is damaged and forced to shut down.</p>
<p>A special facility that shuts down can’t be used on your next Bastion turn, after which it is repaired and made operational again at no cost to you.</p>
<h4>Criminal Hireling </h4>
<p>One of your Bastion’s hirelings has a criminal past that comes to light when officials or bounty hunters visit your Bastion with a warrant for the hireling’s arrest. You can retain the hireling by paying a bribe of 1d6 × 100 GP. Otherwise, the hireling is arrested and taken away. If this loss leaves one of your facilities without any hirelings, that facility can’t be used on your next Bastion turn. The hireling is then replaced at no cost to you.</p>
<h4>Extraordinary Opportunity </h4>
<p>Your Bastion is given the opportunity to host an important festival or celebration, fund the research of a powerful spellcaster, or appease a domineering noble. Work with the DM to determine the details.</p>
<p>If you seize the opportunity, you must pay 500 GP to cover costs. In return, your Bastion gains a sudden influx of recognition or attention, prompting the DM to roll again on the Bastion Events table (rerolling this result if it comes up again).</p>
<p>If you decline the opportunity, you don’t pay the money and nothing else happens.</p>
<h4>Friendly Visitors </h4>
<p>Friendly visitors come to your Bastion, seeking to use one of your special facilities. They offer 1d6 × 100 GP for the brief use of that facility. For example, a knight might want your Smithy to replace a horseshoe or repair a damaged weapon or suit of armor, or sages might need your Arcane Study to help them settle a dispute. Their use of the facility doesn’t interrupt any orders you’ve issued to it.</p>
<h4>Guest </h4>
<p>A Friendly guest comes to stay at your Bastion. Determine the guest by rolling on the following table, and work with your DM to flesh out the details.</p>
<table>
<tbody>
<tr>
<th>1d4</th>
<th>Guest</th>
</tr>
<tr>
<td>1</td>
<td>The guest is an individual of great renown who stays for 7 days. At the end of their stay, the guest gives you a letter of recommendation (see “Marks of Prestige”.)</td>
</tr>
<tr>
<td>2</td>
<td>The guest requests sanctuary while avoiding persecution for their beliefs or crimes. They depart 7 days later, but not before offering you a gift of 1d6 × 100 GP.</td>
</tr>
<tr>
<td>3</td>
<td>The guest is a mercenary, giving you one additional Bastion Defender. The guest doesn’t require a facility to house them, and they stay until you send them away or they’re killed.</td>
</tr>
<tr>
<td>4</td>
<td>The guest is a Friendly monster, such as a brass dragon or a treant. If your Bastion is attacked while this monster is your guest, it defends your Bastion, and you lose no Bastion Defenders. The monster leaves after it defends your Bastion once or when you send it away.</td>
</tr>
</tbody></table>
<h4>Lost Hirelings </h4>
<p>One of your Bastion’s special facilities (determined randomly) loses its hirelings. The cause of their departure is up to you. The facility can’t be used on your next Bastion turn, but the hirelings are replaced at no cost to you at that point.</p>
<h4>Magical Discovery </h4>
<p>Your hirelings discover or accidentally create an Uncommon magic item of your choice at no cost to you. The magic item must be a Potion or Scroll.</p>
<h4>Refugees </h4>
<p>A group of 2d4 refugees fleeing from a monster attack, a natural disaster, or some other calamity seeks refuge in your Bastion. If your Bastion lacks a basic facility large enough to house them, the refugees camp right outside the Bastion. The refugees offer you 1d6 × 100 GP as payment for your hospitality and protection. They stay until you find them a new home or a hostile force attacks your Bastion.</p>
<h4>Request for Aid </h4>
<p>Your Bastion is called on to help a local leader. Perhaps there’s a search on for a missing person, or brigands are plaguing the area. If you help, you must dispatch one or more Bastion Defenders. Roll 1d6 for each Bastion Defender you send. If the total is 10 or higher, the problem is solved and you earn a reward of 1d6 × 100 GP. If the total is less than 10, the problem is still solved, but the reward is halved and one of your Bastion Defenders is killed. Remove that Bastion Defender from your Bastion’s roster.</p>
<h4>Treasure </h4>
<p>Your Bastion acquires an art object or a magic item determined by rolling on the table below and then rolling on the specified table in chapter 7. How the Bastion acquires this treasure is up to you. It might represent an inheritance, a gift from a guest or an admirer, a theft, or a fortunate discovery. If you’re in the Bastion, you can claim the treasure immediately; otherwise, it is placed in storage until you can claim it.</p>
<table>
<tbody>
<tr>
<th>1d100</th>
<th>Treasure</th>
</tr>
<tr>
<td>01-40</td>
<td>Roll on the 25 GP Art Objects table.</td>
</tr>
<tr>
<td>41-63</td>
<td>Roll on the 250 GP Art Objects table.</td>
</tr>
<tr>
<td>64-73</td>
<td>Roll on the 750 GP Art Objects table.</td>
</tr>
<tr>
<td>74-75</td>
<td>Roll on the 2,500 GP Art Objects table.</td>
</tr>
<tr>
<td>76-90</td>
<td>Roll on a Common Magic Items table of your choice (Arcana, Armaments, Implements, or Relics).</td>
</tr>
<tr>
<td>91-98</td>
<td>Roll on Uncommon Magic Items table of your choice (Arcana, Armaments, Implements, or Relics).</td>
</tr>
<tr>
<td>99-00</td>
<td>Roll on a Rare Magic Items table of your choice (Arcana, Armaments, Implements, or Relics).</td>
</tr>
</tbody></table>
<h3>Haunted Bastions</h3>
<p>Haunted Bastions are afflicted by unusual supernatural events. These might be unpredictable annoyances at first, but clever characters might turn hauntings to their advantage.</p>
<p>If you use this system, the first special facility characters create in their Bastion is Haunted. A Haunted special facility has the following rules:</p>
<p><strong>Irreplaceable.</strong> A Haunted special facility can’t be replaced until it is no longer Haunted.</p>
<p><strong>Repeating.</strong> While there is at least one Haunted special facility in a Bastion, whenever a character gains a new special facility or replaces a special facility with a different one, roll any die; on an even result, that new facility is Haunted.</p>
<p>When a character issues an order to a Haunted special facility or a Maintain order to their whole Bastion, roll 1d6; on a 1, roll on the Bastion Hauntings table and refer to the “Haunting Descriptions” section to see what happens. A Bastion can experience only one haunting per Bastion turn.</p>
<table>
<tbody>
<tr>
<th>1d100</th>
<th>Haunting</th>
</tr>
<tr>
<td>01-07</td>
<td>Cursed Hireling</td>
</tr>
<tr>
<td>08-15</td>
<td>Free-Roaming Spirit</td>
</tr>
<tr>
<td>16-22</td>
<td>Friendly Ghost</td>
</tr>
<tr>
<td>23-29</td>
<td>Hidden Room</td>
</tr>
<tr>
<td>30-38</td>
<td>Lightning Storm</td>
</tr>
<tr>
<td>39–47</td>
<td>Living Dead</td>
</tr>
<tr>
<td>48-55</td>
<td>Mist Wanderers</td>
</tr>
<tr>
<td>56-63</td>
<td>Mysterious Priest</td>
</tr>
<tr>
<td>64–71</td>
<td>Ill Luck</td>
</tr>
<tr>
<td>72–79</td>
<td>Poltergeist</td>
</tr>
<tr>
<td>80-86</td>
<td>Spacial Warp</td>
</tr>
<tr>
<td>87-93</td>
<td>Spectral Vision</td>
</tr>
<tr>
<td>94-100</td>
<td>Vistani Visitors</td>
</tr>
</tbody></table>
<h3>Haunting Descriptions</h3>
<p>The hauntings from the Bastion Hauntings table are detailed here in alphabetical order.</p>
<h4>Cursed Hireling. </h4>
<p>One of your Bastion’s hirelings is cursed. As long as the hireling remains cursed, it won’t leave the special facility it manages, and any work conducted in that facility takes twice as long to complete.</p>
<h4>Free-Roaming Spirit. </h4>
<p>A random special facility in your Bastion becomes Haunted. If all the special facilities in the Bastion are already Haunted, the DM rolls again on the Bastion Hauntings table.</p>
<h4>Friendly Ghost. </h4>
<p>A benevolent spirit possesses a hireling of the DM’s choice. If the special facility where the hireling works produces items or Gold Pieces, it produces twice as much as usual as long as the hireling remains possessed. The spirit departs after 14 days.</p>
<h4>Hidden Room. </h4>
<p>The spirits reveal a hidden closet within your Bastion. Add a 5-foot-square space to your Bastion. Something might lie inside, at the DM’s discretion.</p>
<h4>Lightning Storm. </h4>
<p>Trade orders issued this turn have no effect (including one that triggered this haunting, if applicable). If you have a Lightning Generator special facility, this Bastion Haunting has no effect.</p>
<h4>Living Dead. </h4>
<p>A group of mindless undead shamble from the Mists. The Attack Bastion event occurs, but roll 3d6 for that event rather than 6d6.</p>
<h4>Mist Wanderers. </h4>
<p>The Mists rise and 1d4 strangers emerge, seeking shelter. If there is room in your Bastion, they join as hirelings. Otherwise, they linger for 1d4 days before vanishing into the Mists.</p>
<h4>Mysterious Priest. </h4>
<p>A hooded priest appears at the Bastion, attracted by its haunting. Roll any die. One of the following occurs based on whether you rolled an even or an odd number on the die:</p>
<p><strong>Inquisitor (Even).</strong> The priest is a witch hunter. If you have an Ancient Altar, Arcane Study, Cabinet of Curiosities, or Séance Parlor in your Bastion, the priest destroys it and you must replace it with a different special facility. If your Bastion has none of these facilities, the Extraordinary Opportunity Bastion event occurs.</p>
<p><strong>Exorcist (Odd).</strong> The priest is an exorcist. If you have a Reliquary, Sacristy, Sanctuary, or Sanctum in your Bastion, the priest offers to remove a haunting from one facility. If you agree, choose one Haunted facility; that facility is no longer Haunted.</p>
<h4>Ill Luck. </h4>
<p>Accidents and bad luck plague your Bastion. Harvest orders issued this turn have no effect (including one that triggered this haunting, if applicable).</p>
<h4>Poltergeist. </h4>
<p>Disruptive happenings plague the Bastion. Empower and Research orders issued this turn have no effect (including one that triggered this haunting, if applicable).</p>
<h4>Spatial Warp. </h4>
<p>The nature of a Bastion special facility changes. Roll 1d4. On a 4, replace one of your Bastion’s special facilities with another for which you qualify; otherwise, increase the size of a Cramped special facility in your Bastion to Roomy or a Roomy one to Vast, at no cost.</p>
<h4>Spectral Vision. </h4>
<p>A ghostly vision of a past event plays out. You gain some insight into the spirits that haunt your Bastion or the history of the surrounding land, as though affected by the Legend Lore spell.</p>
<h4>Vistani Visitors. </h4>
<p>Vistani travelers visit your Bastion, drawn by tales of the spirits that inhabit it. In return for a night’s shelter, they offer to reveal your fate via a casting of the Augury spell or through a tarokka reading (see appendix A). If you turn them away, they depart, but the highest-level special facility in your Bastion that isn’t already Haunted becomes Haunted.</p>
<h2><strong>Fall of a Bastion</strong></h2>
<p>A player character can lose their Bastion in the following ways:</p>
<p><strong>Divestiture.</strong> A character can give up their Bastion anytime, releasing the Bastion’s hirelings and abandoning the location. The divested Bastion is quickly vacated, is eventually looted, and might even be burned to the ground.</p>
<p><strong>Neglect.</strong> If a character issues no orders to their Bastion for a number of consecutive Bastion turns equal to the character’s level (typically because the character is dead or otherwise out of commission), the hirelings abandon the Bastion and the site is eventually looted. If the character returns later, they can start a new Bastion, perhaps building it amid the ruins of the old one.</p>
<p><strong>Ruination.</strong> Drawing the Ruin card from the Deck of Many Things instantly deprives a character of their Bastion. When such an event occurs, the player can decide what terrible fate befalls the Bastion. The Bastion might be sacked by enemies or destroyed by an earthquake, for example.</p>
<p>Regardless of how the Bastion falls, the player can work with the DM to establish a new Bastion and determine how it comes into being. Use the Special Facility Acquisition table to determine how many special facilities come with it. The new Bastion also starts with two basic facilities (one Cramped and one Roomy) of the player’s choice.</p>
`
});
