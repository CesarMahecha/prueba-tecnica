import React, { useState, useEffect } from 'react';
import { Table, Avatar, Modal, Typography, List } from 'antd';

const { Column } = Table;
const { Title, Paragraph } = Typography;

function CharacterTable() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await fetch('https://gateway.marvel.com/v1/public/characters?apikey=a301a38890c476185add87bc696a0677');
                const data = await response.json();
                setCharacters(data.data.results);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        }

        fetchCharacters();
    }, []);

    useEffect(() => {
        async function fetchComics() {
            if (selectedCharacter) {
                try {
                    const response = await fetch(`${selectedCharacter.comics.collectionURI}?apikey=a301a38890c476185add87bc696a0677`);
                    const data = await response.json();
                    setComics(data.data.results);
                } catch (error) {
                    console.error('Error fetching comics:', error);
                }
            }
        }

        fetchComics();
    }, [selectedCharacter]);

    const handleRowClick = (record) => {
        setSelectedCharacter(record);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text, record) => (
                <Avatar src={`${record.thumbnail.path}.${record.thumbnail.extension}`} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <>
            <Table
                dataSource={characters}
                columns={columns}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                pagination={false}
            />
            <Modal
                title={selectedCharacter ? selectedCharacter.name : ''}
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
            >
                {selectedCharacter && (
                    <>
                        <Avatar src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`} />
                        <Title level={4}>{selectedCharacter.name}</Title>
                        <Paragraph>{selectedCharacter.description || 'No description available.'}</Paragraph>
                        <Title level={5}>Comics:</Title>
                        <List
                            dataSource={comics}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href={item.resourceURI}>{item.title}</a>}
                                    />
                                </List.Item>
                            )}
                        />
                    </>
                )}
            </Modal>
        </>
    );
}

export default CharacterTable;